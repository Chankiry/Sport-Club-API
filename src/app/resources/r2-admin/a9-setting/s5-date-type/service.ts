// ===========================================================================>> Core Library
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize }       from 'sequelize';
import * as moment  from 'moment';
import { CreateDateTypeDto, UpdateDateTypeDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import DatesType from 'src/models/pitch/dates_type.model';


// ===========================================================================>> Custom Library

// ===>> Model

@Injectable()
export class AdminDateTypeService {
  constructor(
    @InjectModel(DatesType) private readonly model: typeof DatesType,
  ) {}

  async getAll() {
    return this.model.findAll();
  }

  // async create(dto: CreateDateTypeDto) {
  //   return this.model.create(dto);
  // }

  // async update(id: number, dto: UpdateDateTypeDto) {
  //   const dateType = await this.model.findByPk(id);
  //   if (!dateType) throw new NotFoundException('Date type not found');
  //   return dateType.update(dto);
  // }

  // async delete(id: number) {
  //   const dateType = await this.model.findByPk(id);
  //   if (!dateType) throw new NotFoundException('Date type not found');
  //   await dateType.destroy();
  //   return { message: 'Deleted successfully' };
  // }
}
