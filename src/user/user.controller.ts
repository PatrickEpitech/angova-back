import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}



  @Get()
  async findAll() {
    console.log("sddd")
    try {
      const users = await this.userService.findAll();
      if (!users) {
        throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: 'No Users',
            },
            HttpStatus.NOT_FOUND,
        );
      }
      return users;
    } catch (error) {
      throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: "Error: can't fetch users",
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            cause: error,
          },
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      await this.userService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Users not found',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  async findOneById(@Param('email') email: string) {
    try {
      await this.userService.findOne(+email);
    } catch (error) {
      throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Users not found',
          },
          HttpStatus.NOT_FOUND,
          {
            cause: error,
          },
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      await this.userService.update(+id, updateUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Can't update the user",
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(+id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Can't remove the user",
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
