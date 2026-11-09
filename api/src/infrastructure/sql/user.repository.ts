import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/user.entity';
import { UserRepositoryPort } from '../../domain/repositories/user.repository.port';
import { UserEntity } from './user.entity';

@Injectable()
export class SqlUserRepository implements UserRepositoryPort {
  private readonly logger = new Logger(SqlUserRepository.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly typeOrmRepository: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    this.logger.log(`Creating user with email: ${user.email}`);
    const userEntity = this.toUserEntity(user);
    const savedEntity = await this.typeOrmRepository.save(userEntity);
    return this.toUserDomain(savedEntity);
  }

  async findById(id: string): Promise<User | null> {
    this.logger.log(`Finding user by id: ${id}`);
    const userEntity = await this.typeOrmRepository.findOne({ where: { id } });
    return userEntity ? this.toUserDomain(userEntity) : null;
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Finding all users');
    const userEntities = await this.typeOrmRepository.find();
    return userEntities.map((entity) => this.toUserDomain(entity));
  }

  async update(id: string, partialUser: Partial<User>): Promise<User> {
    this.logger.log(`Updating user with id: ${id}`);
    const userEntity = await this.typeOrmRepository.findOne({ where: { id } });
    if (!userEntity) {
      throw new Error('User not found');
    }

    const updatedEntity = { ...userEntity, ...partialUser };
    const savedEntity = await this.typeOrmRepository.save(updatedEntity);
    return this.toUserDomain(savedEntity);
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting user with id: ${id}`);
    await this.typeOrmRepository.delete(id);
  }

  private toUserEntity(user: User): UserEntity {
    const entity = new UserEntity(
      user.id,
      user.name,
      user.email,
      user.birthDate,
      true,
      'USER',
      null,
      null,
      null,
      null,
    );
    return entity;
  }

  private toUserDomain(userEntity: UserEntity): User {
    return User.fromPlainObject({
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      birthDate: userEntity.birthDate,
    });
  }
}