// ===========================================================================>> Core Library
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize }       from 'sequelize';
import * as moment  from 'moment';
import PitchesCategory from 'src/models/pitch/pitches_category.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePitchCategoryDto, UpdatePitchCategoryDto } from './dto';
import Sports from 'src/models/sport/sports.model';
import { catchError } from 'rxjs';


// ===========================================================================>> Custom Library

// ===>> Model
@Injectable()
export class AdminPitchCategoryService {
  constructor(
    @InjectModel(PitchesCategory)
    private readonly model: typeof PitchesCategory
  ) {}

  async getData() {
    const categories = await this.model.findAll({ include: ['sport'] });
    return categories.map((item)=>({
        id : item.id,
        name : item.name,
        basePrice : item.price,
        maxCapacity : item.required_players,
        volume : item.volume

    }));
  }catch(error){
    throw new BadRequestException(error.message);
  }

    // Create
    async create(body: CreatePitchCategoryDto) {
    try {
        const sport = await Sports.findByPk(body.sport_id);
        if (!sport) throw new BadRequestException('sport with this id does not exist please check again');
        const item = await this.model.create(body);
        return {
        id: item.id,
        name: item.name,
        price: item.price,
        required_players: item.required_players,
        volume : item.volume,
        img : ''
        };
    } catch (error) {
        console.error('Create error:', error); // Keep for debugging
        throw new BadRequestException(error.message);
    }
    }

    // Update
    async update(id: number, body: CreatePitchCategoryDto) {
    try {
        if(body.sport_id !== null && body.sport_id !==undefined){
            const sport = await Sports.findByPk(body.sport_id);
            if (!sport) throw new BadRequestException('sport with this id does not exist please check again');
        }
        const record = await this.model.findByPk(id);
        if (!record) throw new NotFoundException('pitch category with this id does not exist please check again');

        const item = await record.update(body);

        return {
        id: item.id,
        name: item.name,
        price: item.price,
        required_players: item.required_players
        };
    } catch (error) {
        console.error('Update Error:', error);  // 👈 shows the actual DB or Sequelize error
        throw new BadRequestException(error.message);
    }
    }
    async setupData() {
    try {
        const sports = await Sports.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']]
        });

        return {
        sports: sports.map(s => ({
            id: s.id,
            name: s.name
        }))
        };
    } catch (error) {
        throw new BadRequestException('Failed to load setup data');
    }
    }

    async delete(id: number) {
        const record = await this.model.findByPk(id);
        if (!record) throw new NotFoundException('Pitch category not found');
        await record.destroy();
        return { message: 'Deleted successfully' };
    }
}