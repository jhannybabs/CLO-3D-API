import { Injectable } from '@nestjs/common';
import { CreateFittingDto } from './dto/create-fitting.dto';
import { UpdateFittingDto } from './dto/update-fitting.dto';

@Injectable()
export class FittingService {
  create(createFittingDto: CreateFittingDto) {
    return 'This action adds a new fitting';
  }

  findAll() {
    return `This action returns all fitting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fitting`;
  }

  update(id: number, updateFittingDto: UpdateFittingDto) {
    return `This action updates a #${id} fitting`;
  }

  remove(id: number) {
    return `This action removes a #${id} fitting`;
  }
}
