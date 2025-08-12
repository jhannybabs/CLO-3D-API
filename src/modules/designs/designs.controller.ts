import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DesignsService } from './designs.service';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';

@Controller('designs')
export class DesignsController {
  constructor(private readonly designsService: DesignsService) {}

  @Post("create-design")
  create(@Body() createDesignDto: CreateDesignDto) {
    return this.designsService.createDesign(createDesignDto);
  }

  @Get("get-all-designs")
  findAll() {
    return this.designsService.findAllDesigns();
  }

  @Get('get-design/:id')
  findOne(@Param('id') id: number) {
    return this.designsService.findOneDesign(id);
  }

  @Put('update-design/:id')
  update(@Param('id') id: number, @Body() updateDesignDto: UpdateDesignDto) {
    return this.designsService.updateDesign(id, updateDesignDto);
  }

  @Delete('delete-design/:id')
  remove(@Param('id') id: number) {
    return this.designsService.removeDesign(id);
  }
}
