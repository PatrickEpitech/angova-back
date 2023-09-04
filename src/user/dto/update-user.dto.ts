import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { User } from '../entities/user.entity';
import { Role } from 'src/role/entities/role.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  username?: string;
  email?: string;
  password?: string;
  admin?: User;
  manager?: User;
  role?: Role;
}
