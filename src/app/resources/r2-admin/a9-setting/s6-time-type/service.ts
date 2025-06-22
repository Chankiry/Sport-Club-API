// ===========================================================================>> Core Library
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize }       from 'sequelize';
import * as moment  from 'moment';
import { CreateTimeTypeDto, UpdateTimeTypeDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import TimesType from 'src/models/pitch/times_type.model';


// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class AdminTimeTypeService {
  constructor(
    @InjectModel(TimesType)
    private readonly timesTypeRepo: typeof TimesType
  ) {}

  async getData() {
    return await this.timesTypeRepo.findAll();
  }

  async create(dto: CreateTimeTypeDto) {
    return await this.timesTypeRepo.create(dto);
  }

  async update(id: number, dto: UpdateTimeTypeDto) {
    const record = await this.timesTypeRepo.findByPk(id);
    if (!record) throw new NotFoundException('TimeType not found');
    return await record.update(dto);
  }

  async delete(id: number) {
    const record = await this.timesTypeRepo.findByPk(id);
    if (!record) throw new NotFoundException('TimeType not found');
    return await record.destroy();
  }
}