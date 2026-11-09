import { IsEmail, IsNotEmpty, IsString, IsDate, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class User {
  private readonly _id: string;
  private _name: string;
  private _email: string;
  private _birthDate: Date;

  constructor(id: string, name: string, email: string, birthDate: Date) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.birthDate = birthDate;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (!value || value.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    if (!value || !/^[^s@]+@[^s@]+.[^s@]+$/.test(value)) {
      throw new Error('Invalid email format');
    }
    this._email = value;
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  set birthDate(value: Date) {
    if (!value || value > new Date()) {
      throw new Error('Birth date must be in the past');
    }
    this._birthDate = value;
  }

  static fromPlainObject(plain: { id: string; name: string; email: string; birthDate: Date }): User {
    return new User(plain.id, plain.name, plain.email, plain.birthDate);
  }

  toPlainObject(): { id: string; name: string; email: string; birthDate: Date } {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      birthDate: this._birthDate
    };
  }

  updateFromPartial(partial: Partial<{ name: string; email: string; birthDate: Date }>): void {
    if (partial.name !== undefined) {
      this.name = partial.name;
    }
    if (partial.email !== undefined) {
      this.email = partial.email;
    }
    if (partial.birthDate !== undefined) {
      this.birthDate = partial.birthDate;
    }
  }
}