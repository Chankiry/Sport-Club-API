// ===========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize }       from 'sequelize';
import * as moment  from 'moment';
import Equipment from 'src/models/equiment/equitments.model';
import { CreateEquippmentDto } from './dto';
import { Repository } from 'sequelize-typescript';
// import { InjectRepository } from '@nestjs/typeorm';

// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class AdminEquipmentService {
    // ==================================================================>> Get data Equipment

//     constructor(
//     @InjectRepository(Equipment)
//     private readonly productRepository: Repository<Equipment>,
//   ) {}

    async getData() { 
        try {
            
            const equipment =await Equipment.findAll({
                attributes: ['id', 'name', 'image', 'sport_id', 'price'],
            })
            return equipment;

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

    async createData( body: CreateEquippmentDto) {
        try {

            return ;
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

}
