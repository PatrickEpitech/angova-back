import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from '../../role/entities/role.entity';
export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  manager: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Admin' })
  admin: User;
}

export const UserSchema = SchemaFactory.createForClass(User);
