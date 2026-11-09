import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { IsEmail, IsDate, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from '../../domain/user.entity';

export { User } from '../../domain/user.entity';

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(255, { message: 'El nombre no puede exceder 255 caracteres' })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
  @IsString({ message: 'El email debe ser una cadena de texto' })
  @MaxLength(255, { message: 'El email no puede exceder 255 caracteres' })
  email: string;

  @Column({ type: 'date' })
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
  birthDate: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsString({ message: 'El rol debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El rol no puede exceder 50 caracteres' })
  role: string | null;

  @Column({ type: 'text', nullable: true })
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  address: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @MaxLength(20, { message: 'El teléfono no puede exceder 20 caracteres' })
  phone: string | null;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'created_by' })
  @IsString({ message: 'El creador debe ser una cadena de texto' })
  createdBy: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'updated_by' })
  @IsString({ message: 'El actualizador debe ser una cadena de texto' })
  updatedBy: string | null;

  @BeforeInsert()
  setDefaultValues(): void {
    if (!this.isActive) {
      this.isActive = true;
    }
    if (!this.role) {
      this.role = 'USER';
    }
  }

  @BeforeUpdate()
  validateBeforeUpdate(): void {
    if (!this.role) {
      this.role = 'USER';
    }
  }

  constructor(
    id: string,
    name: string,
    email: string,
    birthDate: Date,
    isActive: boolean = true,
    role: string | null = 'USER',
    address: string | null = null,
    phone: string | null = null,
    createdBy: string | null = null,
    updatedBy: string | null = null,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.birthDate = birthDate;
    this.isActive = isActive;
    this.role = role;
    this.address = address;
    this.phone = phone;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }

  static fromPartial(partial: Partial<UserEntity>): UserEntity {
    const entity = new UserEntity(
      partial.id || '',
      partial.name || '',
      partial.email || '',
      partial.birthDate || new Date(),
      partial.isActive,
      partial.role,
      partial.address,
      partial.phone,
      partial.createdBy,
      partial.updatedBy,
    );
    return entity;
  }

  isValidForCreation(): boolean {
    if (!this.id || !this.name || !this.email || !this.birthDate) {
      return false;
    }
    if (this.name.length < 2 || this.name.length > 255) {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      return false;
    }
    const today = new Date();
    if (this.birthDate > today) {
      return false;
    }
    return true;
  }

  isValidForUpdate(): boolean {
    if (this.name !== undefined && (this.name.length < 2 || this.name.length > 255)) {
      return false;
    }
    if (this.email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        return false;
      }
    }
    if (this.birthDate !== undefined) {
      const today = new Date();
      if (this.birthDate > today) {
        return false;
      }
    }
    return true;
  }
}