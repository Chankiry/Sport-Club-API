// ===========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize, Transaction } from 'sequelize';
import * as moment from 'moment';
import Equipment from 'src/models/equiment/equitments.model';
import { CreateEquippmentDto } from './dto';
import { Repository } from 'sequelize-typescript';
import { FileService } from 'src/app/services/file.service';
import sequelizeConfig from 'src/config/sequelize.config';
// import { InjectRepository } from '@nestjs/typeorm';

// ===========================================================================>> Custom Library

// ===>> Model

@Injectable()
export class AdminEquipmentService {

  // ==================================================================>> Get data Equipment

//   constructor(private fileService: FileService) {}

  async getData() {
    try {
      const equipments = await Equipment.findAll({
        attributes: ['id', 'name', 'image', 'sport_id', 'price'],
      });
      return equipments;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message); // Handle errors gracefully
    }
  }

 async create(body: CreateEquippmentDto) {
    const sequelize = new Sequelize(sequelizeConfig);
    let transaction: Transaction;

    try {
      transaction = await sequelize.transaction();

      const newEquipment = await Equipment.create(body, {
        returning: true,
        transaction,
      });

      if (!newEquipment) {
        await transaction.rollback();
        throw new BadRequestException('Create equipment unsuccessfully!');
      }

      await transaction.commit();

      return newEquipment;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, body: CreateEquippmentDto) {
    const sequelize = new Sequelize(sequelizeConfig);
    let transaction: Transaction;

    try {
      transaction = await sequelize.transaction();

      const equipment = await Equipment.findByPk(id);
      if (!equipment) {
        await transaction.rollback();
        throw new BadRequestException('Equipment not found!');
      }

      const [affectedRows, [updatedEquipment]] = await Equipment.update(body, {
        where: { id },
        returning: true,
        transaction,
      });

      if (!affectedRows) {
        await transaction.rollback();
        throw new BadRequestException('Update equipment unsuccessfully!');
      }

      await transaction.commit();

      return updatedEquipment;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number) {
    const sequelize = new Sequelize(sequelizeConfig);
    let transaction: Transaction;

    try {
      transaction = await sequelize.transaction();

      const equipment = await Equipment.findByPk(id);
      if (!equipment) {
        await transaction.rollback();
        throw new BadRequestException('Equipment not found!');
      }

      const result = await Equipment.destroy({
        where: { id },
        transaction,
      });

      if (!result) {
        await transaction.rollback();
        throw new BadRequestException('Delete equipment unsuccessfully!');
      }

      await transaction.commit();

      return {
        message: 'Delete Equipment successfully!',
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }
}
