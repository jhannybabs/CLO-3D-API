import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FittingService } from './fitting.service';
import { CreateFittingDto } from './dto/create-fitting.dto';
import { UpdateFittingDto } from './dto/update-fitting.dto';

@Controller('fitting')
export class FittingController {
  constructor(private readonly fittingService: FittingService) {}

  @Post()
  create(@Body() createFittingDto: CreateFittingDto) {
    return this.fittingService.create(createFittingDto);
  }

  @Get()
  findAll() {
    return this.fittingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fittingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFittingDto: UpdateFittingDto) {
    return this.fittingService.update(+id, updateFittingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fittingService.remove(+id);
  }
}
