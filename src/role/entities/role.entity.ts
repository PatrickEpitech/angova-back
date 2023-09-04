import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Role {
  @Prop()
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
