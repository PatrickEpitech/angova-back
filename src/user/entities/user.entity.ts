import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from '../../role/entities/role.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true
})

export class User {
  @Prop()
  username: string;

  @Prop({unique: [true, 'Duplicate email entered']})
  email: string;

  @Prop()
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;

}

export const UserModel = SchemaFactory.createForClass(User);
