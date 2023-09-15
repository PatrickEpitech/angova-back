import { Role } from 'src/role/entities/role.entity';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  role: Role;
}
