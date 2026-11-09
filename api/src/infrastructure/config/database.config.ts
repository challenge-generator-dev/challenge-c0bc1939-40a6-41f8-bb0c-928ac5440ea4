import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../sql/user.entity';

export interface DatabaseConfig {
  sql: TypeOrmModuleOptions;
  mongoose: MongooseModuleAsyncOptions;
  dynamodb: {
    region: string;
    endpoint: string;
    tableName: string;
  };
}

export function getSqlConfig(configService: ConfigService): TypeOrmModuleOptions {
  const host = configService.get<string>('DATABASE_HOST', 'localhost');
  const port = configService.get<number>('DATABASE_PORT', 5432);
  const username = configService.get<string>('DATABASE_USERNAME', 'postgres');
  const password = configService.get<string>('DATABASE_PASSWORD', 'postgres');
  const database = configService.get<string>('DATABASE_NAME', 'user_management');
  const ssl = configService.get<boolean>('DATABASE_SSL', false);

  return {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    entities: [UserEntity],
    synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE', true),
    logging: configService.get<boolean>('DATABASE_LOGGING', false),
    ssl: ssl ? { rejectUnauthorized: false } : false,
    extra: {
      pool: {
        min: 2,
        max: 10,
      },
    },
  };
}

export function getMongooseConfig(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      const host = configService.get<string>('MONGODB_HOST', 'localhost');
      const port = configService.get<number>('MONGODB_PORT', 27017);
      const database = configService.get<string>('MONGODB_DATABASE', 'user_management');
      const username = configService.get<string>('MONGODB_USERNAME');
      const password = configService.get<string>('MONGODB_PASSWORD');

      const uri = username && password
        ? `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`
        : `mongodb://${host}:${port}/${database}`;

      return {
        uri,
        dbName: database,
        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('MongoDB connected successfully');
          });
          connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
          });
          return connection;
        },
      };
    },
    inject: [ConfigService],
  };
}

export function getDynamodbConfig(configService: ConfigService) {
  return {
    region: configService.get<string>('AWS_REGION', 'us-east-1'),
    endpoint: configService.get<string>('DYNAMODB_ENDPOINT', 'http://localhost:8000'),
    tableName: configService.get<string>('DYNAMODB_TABLE_NAME', 'users'),
    accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
  };
}

export class DatabaseConfigFactory {
  static createSqlOptions(configService: ConfigService): TypeOrmModuleOptions {
    return getSqlConfig(configService);
  }

  static createMongooseOptions(): MongooseModuleAsyncOptions {
    return getMongooseConfig();
  }

  static createDynamodbOptions(configService: ConfigService) {
    return getDynamodbConfig(configService);
  }
}