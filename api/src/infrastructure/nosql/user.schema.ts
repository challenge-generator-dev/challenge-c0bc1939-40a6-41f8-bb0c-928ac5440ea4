import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../domain/user.entity';

export type UserDocument = UserModel & Document;

@Schema({ timestamps: true, collection: 'users' })
export class UserModel {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: Date })
  birthDate: Date;

  constructor(name: string, email: string, birthDate: Date) {
    this.name = name;
    this.email = email;
    this.birthDate = birthDate;
  }
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

UserSchema.set('toObject', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export class UserSchemaMapper {
  static toDomain(doc: UserDocument): User {
    if (!doc) return null;
    return User.fromPlainObject({
      id: doc._id?.toString() || doc.id,
      name: doc.name,
      email: doc.email,
      birthDate: doc.birthDate,
    });
  }

  static toSchemaData(user: User): Partial<UserModel> {
    return {
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
    };
  }
}