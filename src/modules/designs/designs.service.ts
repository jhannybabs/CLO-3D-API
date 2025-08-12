import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RESPONSE } from 'src/utils/response.util';
import { Designs } from 'src/database/schema/Designs.schema';

@Injectable()
export class DesignsService {
  constructor(@InjectModel(Designs.name) private designModel: Model<Designs>) {}

  async createDesign(createDesignDto: CreateDesignDto) {
    try {
      let response = await this.designModel.create(createDesignDto);
      if (response == null) {
        return RESPONSE(HttpStatus.BAD_REQUEST, {}, 'Design not created!');
      }
      return RESPONSE(HttpStatus.CREATED, {}, 'Design created successfully!');
    } catch (error: any) {
      return RESPONSE(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal server error: ' + error.message,
      );
    }
  }

  async findAllDesigns() {
    try {
      let response = await this.designModel.find();
      if (response.length === 0) {
        return RESPONSE(HttpStatus.NOT_FOUND, {}, 'No designs found!');
      }
      return RESPONSE(HttpStatus.OK, response, 'Designs fetched successfully!');
    } catch (error: any) {
      return RESPONSE(
        HttpStatus.INTERNAL_SERVER_ERROR,
        {},
        'Error fetching designs: ' + error.message,
      );
    }
  }

  async findOneDesign(id: number) {
    try {
      let design = await this.designModel.findOne({ designId: id });
      if (!design) {
        return RESPONSE(HttpStatus.NOT_FOUND, {}, 'Design not found!');
      }
      return RESPONSE(HttpStatus.OK, design, 'Design fetched successfully!');
    } catch (error: any) {
      return RESPONSE(
        HttpStatus.INTERNAL_SERVER_ERROR,
        {},
        'Error fetching design: ' + error.message,
      );
    }
  }

  async updateDesign(id: number, updateDesignDto: UpdateDesignDto) {
    try {
      let design = await this.designModel.findOneAndUpdate(
        { designId: id },
        updateDesignDto,
        { new: true },
      );
      if (!design) {
        return RESPONSE(HttpStatus.NOT_FOUND, {}, 'Design not found!');
      }
      return RESPONSE(HttpStatus.OK, design, 'Design updated successfully!');
    } catch (error: any) {
      return RESPONSE(
        HttpStatus.INTERNAL_SERVER_ERROR,
        {},
        'Error updating design: ' + error.message,
      );
    }
  }

  async removeDesign(id: number) {
    try {
      let response = await this.designModel.deleteOne({ designId: id });
      if (response.deletedCount === 0) {
        return RESPONSE(HttpStatus.NOT_FOUND, {}, 'Design not found!');
      }
      return RESPONSE(HttpStatus.OK, {}, 'Design deleted successfully!');
    } catch (error: any) {
      return RESPONSE(
        HttpStatus.INTERNAL_SERVER_ERROR,
        {},
        'Error deleting design: ' + error.message,
      );
    }
  }
}
