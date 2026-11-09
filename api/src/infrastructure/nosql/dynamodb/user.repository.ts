import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  ScanCommand,
  DynamoDBClientConfig,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand as DocScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { User } from '../../../domain/user.entity';
import { UserRepositoryPort } from '../../../domain/repositories/user.repository.port';

@Injectable()
export class DynamodbUserRepository implements UserRepositoryPort {
  private readonly logger = new Logger(DynamodbUserRepository.name);
  private readonly docClient: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(private readonly configService: ConfigService) {
    const clientConfig: DynamoDBClientConfig = {
      region: this.configService.get<string>('AWS_REGION') || 'us-east-1',
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') || '',
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || '',
      },
    };

    const endpoint = this.configService.get<string>('DYNAMODB_ENDPOINT');
    if (endpoint) {
      clientConfig.endpoint = endpoint;
    }

    const client = new DynamoDBClient(clientConfig);
    this.docClient = DynamoDBDocumentClient.from(client);
    this.tableName = this.configService.get<string>('DYNAMODB_TABLE_NAME') || 'users';
  }

  async create(user: User): Promise<User> {
    this.logger.log(`Creating user with email: ${user.email}`);
    
    const item = {
      id: { S: user.id },
      name: { S: user.name },
      email: { S: user.email },
      birthDate: { S: user.birthDate.toISOString() },
    };

    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: item,
        ConditionExpression: 'attribute_not_exists(id)',
      }),
    );

    this.logger.log(`User created with ID: ${user.id}`);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    this.logger.log(`Finding user by ID: ${id}`);
    
    const result = await this.docClient.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id: { S: id } },
      }),
    );

    if (!result.Item) {
      this.logger.warn(`User not found with ID: ${id}`);
      return null;
    }

    return this.itemToUser(result.Item);
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Finding all users');
    
    const result = await this.docClient.send(
      new DocScanCommand({
        TableName: this.tableName,
      }),
    );

    const users = (result.Items || []).map((item) => this.itemToUser(item));
    this.logger.log(`Found ${users.length} users`);
    
    return users;
  }

  async update(id: string, partialUser: Partial<User>): Promise<User> {
    this.logger.log(`Updating user with ID: ${id}`);
    
    const updateExpressions: string[] = [];
    const expressionAttributeValues: Record<string, unknown> = {};

    if (partialUser.name !== undefined) {
      updateExpressions.push('#name = :name');
      expressionAttributeValues[':name'] = { S: partialUser.name };
    }
    if (partialUser.email !== undefined) {
      updateExpressions.push('#email = :email');
      expressionAttributeValues[':email'] = { S: partialUser.email };
    }
    if (partialUser.birthDate !== undefined) {
      updateExpressions.push('#birthDate = :birthDate');
      expressionAttributeValues[':birthDate'] = { S: partialUser.birthDate.toISOString() };
    }

    if (updateExpressions.length === 0) {
      const existingUser = await this.findById(id);
      if (!existingUser) {
        throw new Error(`User with ID ${id} not found for update`);
      }
      return existingUser;
    }

    const result = await this.docClient.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { id: { S: id } },
        UpdateExpression: `SET ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames: {
          '#name': 'name',
          '#email': 'email',
          '#birthDate': 'birthDate',
        },
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      }),
    );

    if (!result.Attributes) {
      throw new Error(`Failed to update user with ID: ${id}`);
    }

    this.logger.log(`User updated successfully: ${id}`);
    return this.itemToUser(result.Attributes);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting user with ID: ${id}`);
    
    const existingUser = await this.findById(id);
    if (!existingUser) {
      this.logger.warn(`User not found for deletion with ID: ${id}`);
      throw new Error(`User with ID ${id} not found for deletion`);
    }

    await this.docClient.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id: { S: id } },
      }),
    );

    this.logger.log(`User deleted successfully: ${id}`);
  }

  private itemToUser(item: Record<string, unknown>): User {
    return User.fromPlainObject({
      id: (item.id as { S: string }).S,
      name: (item.name as { S: string }).S,
      email: (item.email as { S: string }).S,
      birthDate: new Date((item.birthDate as { S: string }).S),
    });
  }
}