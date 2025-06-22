// ===========================================================================>> Core Library
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize }       from 'sequelize';
import * as moment  from 'moment';
import Pitches from 'src/models/pitch/pitches.model';
import { CreatePitchDto, UpdatePitchDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import PitchesCategory from 'src/models/pitch/pitches_category.model';


// ===========================================================================>> Custom Library

// ===>> Model

@Injectable()
export class AdminPitchService {
  constructor(
    @InjectModel(PitchesCategory)
    private readonly model: typeof PitchesCategory
  ) {}
  async getData(): Promise<Pitches[]> {
    return await Pitches.findAll({ order: [['created_at', 'DESC']] });
  }

  async View(id: number): Promise<Pitches> {
    const pitch = await Pitches.findByPk(id);
    if (!pitch) throw new NotFoundException('Pitch not found');
    return pitch;
  }

  async create(data: CreatePitchDto): Promise<Pitches> {
    return await Pitches.create(data);
  }

  async update(id: number, data: UpdatePitchDto): Promise<Pitches> {
    const pitch = await this.View(id);
    return await pitch.update(data);
  }

  async delete(id: number): Promise<{ message: string }> {
    const pitch = await this.View(id);
    await pitch.destroy();
    return { message: 'Pitch deleted successfully' };
  }
   async setupData() {
  try {
    const categories = await this.model.findAll({ include: ['sport'] });
    return categories.map((item) => ({
      id: item.id,
      name: item.name,
  
    }));
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}


}