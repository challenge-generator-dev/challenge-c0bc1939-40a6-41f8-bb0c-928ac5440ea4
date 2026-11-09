import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../domain/user.entity';

export class UserResponseDto {
  @ApiProperty({ description: 'Unique identifier of the user', example: '123e4567-e89b-12d3-a456-426614174000' })
  readonly id: string;

  @ApiProperty({ description: 'Name of the user', example: 'John Doe' })
  readonly name: string;

  @ApiProperty({ description: 'Email address of the user', example: 'john.doe@example.com' })
  readonly email: string;

  @ApiProperty({ description: 'Birth date of the user', example: '1990-01-15' })
  readonly birthDate: Date;

  constructor(id: string, name: string, email: string, birthDate: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.birthDate = birthDate;
  }

  static fromDomain(user: User): UserResponseDto {
    return new UserResponseDto(
      user.id,
      user.name,
      user.email,
      user.birthDate,
    );
  }

  static fromDomainList(users: User[]): UserResponseDto[] {
    return users.map(user => UserResponseDto.fromDomain(user));
  }
}