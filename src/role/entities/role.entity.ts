import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Role extends Document {
  @Prop()
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
export const RoleModel = SchemaFactory.createForClass(Role);