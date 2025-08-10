import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RESPONSE } from 'src/utils/response.util';
import { Users } from '../../database/schema/Users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const response = await this.userModel.create(createUserDto);
      if (!response) {
        return RESPONSE(HttpStatus.BAD_REQUEST, {}, 'User not created!');
      }
      return RESPONSE(HttpStatus.CREATED, {}, 'User created successfully!');
    } catch (error: any) {
      return RESPONSE(
        HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error: ' + error.message,
      );
    }
  }

  async findAllUsers() {
    try {
      const users = await this.userModel.find().exec();
      return RESPONSE(HttpStatus.OK, users, 'Users fetched successfully!');
    } catch (error: any) {
      return RESPONSE(
        HttpStatus.INTERNAL_SERVER_ERROR,
        {},
        'Error fetching users: ' + error.message,
      );
    }
  }

  async findOneUser(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        return RESPONSE(HttpStatus.NOT_FOUND, {}, 'User not found!');
      }
      return RESPONSE(HttpStatus.OK, user, 'User fetched successfully!');
    } catch (error: any) {
      return RESPONSE(
        HttpStatus.INTERNAL_SERVER_ERROR,
        {},
        'Error fetching user: ' + error.message,
      );
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
      if (!updatedUser) {
        return RESPONSE(HttpStatus.NOT_FOUND, {}, 'User not found!');
      }
      return RESPONSE(HttpStatus.OK, updatedUser, 'User updated successfully!');
    } catch (error: any) {
      return RESPONSE(
        HttpStatus.INTERNAL_SERVER_ERROR,
        {},
        'Error updating user: ' + error.message,
      );
    }
  }

  async removeUser(id: string) {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
      if (!deletedUser) {
        return RESPONSE(HttpStatus.NOT_FOUND, {}, 'User not found!');
      }
      return RESPONSE(HttpStatus.OK, {}, 'User deleted successfully!');
    } catch (error: any) {
      return RESPONSE(
        HttpStatus.INTERNAL_SERVER_ERROR,
        {},
        'Error deleting user: ' + error.message,
      );
    }
  }
}
