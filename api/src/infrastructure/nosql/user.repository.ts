import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/user.entity';
import { UserRepositoryPort } from '../../domain/repositories/user.repository.port';
import { UserDocument } from './user.schema';

@Injectable()
export class NosqlUserRepository implements UserRepositoryPort {
  private readonly logger = new Logger(NosqlUserRepository.name);

  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    this.logger.log(`Creating user with email: ${user.email}`);
    
    const userDocument = new this.userModel({
      _id: user.id,
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
    });

    const savedDocument = await userDocument.save();
    this.logger.log(`User created with ID: ${savedDocument._id}`);
    
    return this.toUserDomain(savedDocument);
  }

  async findById(id: string): Promise<User | null> {
    this.logger.log(`Finding user by ID: ${id}`);
    
    const userDocument = await this.userModel.findById(id).exec();
    
    if (!userDocument) {
      this.logger.warn(`User not found with ID: ${id}`);
      return null;
    }
    
    return this.toUserDomain(userDocument);
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Finding all users');
    
    const userDocuments = await this.userModel.find().exec();
    this.logger.log(`Found ${userDocuments.length} users`);
    
    return userDocuments.map((doc) => this.toUserDomain(doc));
  }

  async update(id: string, partialUser: Partial<User>): Promise<User> {
    this.logger.log(`Updating user with ID: ${id}`);
    
    const updateData: Record<string, unknown> = {};
    
    if (partialUser.name !== undefined) {
      updateData.name = partialUser.name;
    }
    if (partialUser.email !== undefined) {
      updateData.email = partialUser.email;
    }
    if (partialUser.birthDate !== undefined) {
      updateData.birthDate = partialUser.birthDate;
    }

    const updatedDocument = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedDocument) {
      this.logger.error(`Failed to update user with ID: ${id}`);
      throw new Error(`User with ID ${id} not found for update`);
    }
    
    this.logger.log(`User updated successfully: ${id}`);
    return this.toUserDomain(updatedDocument);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting user with ID: ${id}`);
    
    const result = await this.userModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      this.logger.warn(`User not found for deletion with ID: ${id}`);
      throw new Error(`User with ID ${id} not found for deletion`);
    }
    
    this.logger.log(`User deleted successfully: ${id}`);
  }

  private toUserDomain(userDocument: UserDocument): User {
    return User.fromPlainObject({
      id: userDocument._id.toString(),
      name: userDocument.name,
      email: userDocument.email,
      birthDate: userDocument.birthDate,
    });
  }
}