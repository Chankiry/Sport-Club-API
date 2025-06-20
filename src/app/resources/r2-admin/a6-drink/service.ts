// ===========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Sequelize, Transaction } from 'sequelize';
import sequelizeConfig from 'src/config/sequelize.config';
import { CreateDrinkDTO } from './dto';
import Drink from 'src/models/drink/drinks.model';
// ===========================================================================>> Custom Library
@Injectable()
export class AdminDrinkService {

  // ==================================================================>> Get all drinks
  async getData() {
    try {
      const drinks = await Drink.findAll({
        attributes: ['id', 'name', 'price', 'image'],
      });

      return drinks;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  // ==================================================================>> Create drink
  async create(body: CreateDrinkDTO) {
    const sequelize = new Sequelize(sequelizeConfig);
    let transaction: Transaction;

    try {
      transaction = await sequelize.transaction();

      const newDrink = await Drink.create(body, {
        returning: true,
        transaction,
      });

      if (!newDrink) {
        await transaction.rollback();
        throw new BadRequestException('Create drink unsuccessfully!');
      }

      await transaction.commit();

      return newDrink;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  // ==================================================================>> Update drink
  async update(id: number, body: CreateDrinkDTO) {
    const sequelize = new Sequelize(sequelizeConfig);
    let transaction: Transaction;

    try {
      transaction = await sequelize.transaction();

      const drink = await Drink.findByPk(id);
      if (!drink) {
        await transaction.rollback();
        throw new BadRequestException('Drink not found!');
      }

      const [affectedRows, [updatedDrink]] = await Drink.update(body, {
        where: { id },
        returning: true,
        transaction,
      });

      if (!affectedRows) {
        await transaction.rollback();
        throw new BadRequestException('Update drink unsuccessfully!');
      }

      await transaction.commit();

      return updatedDrink;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  // ==================================================================>> Delete drink
  async delete(id: number) {
    const sequelize = new Sequelize(sequelizeConfig);
    let transaction: Transaction;

    try {
      transaction = await sequelize.transaction();

      const drink = await Drink.findByPk(id);
      if (!drink) {
        await transaction.rollback();
        throw new BadRequestException('Drink not found!');
      }

      const result = await Drink.destroy({
        where: { id },
        transaction,
      });

      if (!result) {
        await transaction.rollback();
        throw new BadRequestException('Delete drink unsuccessfully!');
      }

      await transaction.commit();

      return {
        message: 'Delete drink successfully!',
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }
}
