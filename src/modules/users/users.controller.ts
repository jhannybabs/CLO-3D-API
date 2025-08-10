import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('get-all-users')
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get('get-user/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneUser(id);
  }

  @Put('update-user/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('delete-user:id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
