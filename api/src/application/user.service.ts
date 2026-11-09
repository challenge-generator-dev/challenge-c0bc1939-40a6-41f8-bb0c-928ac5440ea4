import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { UserRepositoryPort } from '../domain/repositories/user.repository.port';
import { User } from '../domain/user.entity';
import { UserResponseDto } from '../interfaces/http/dto/user.response.dto';
import { CreateUserDto } from '../interfaces/http/dto/create-user.dto';
import { UpdateUserDto } from '../interfaces/http/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = new User(
      this.generateUuid(),
      createUserDto.name,
      createUserDto.email,
      new Date(createUserDto.birthDate),
    );

    const createdUser = await this.userRepository.create(user);
    return UserResponseDto.fromDomain(createdUser);
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return UserResponseDto.fromDomain(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return UserResponseDto.fromDomainList(users);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const emailExists = await this.userRepository.findByEmail(updateUserDto.email);
      if (emailExists) {
        throw new ConflictException('Email already in use by another user');
      }
    }

    const partialUser: Partial<User> = {};
    if (updateUserDto.name !== undefined) partialUser.name = updateUserDto.name;
    if (updateUserDto.email !== undefined) partialUser.email = updateUserDto.email;
    if (updateUserDto.birthDate !== undefined) partialUser.birthDate = new Date(updateUserDto.birthDate);

    const updatedUser = await this.userRepository.update(id, partialUser);
    return UserResponseDto.fromDomain(updatedUser);
  }

  async delete(id: string): Promise<void> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.delete(id);
  }

  private generateUuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}