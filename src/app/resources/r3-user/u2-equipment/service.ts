// src/modules/user-equipment/service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Sequelize, Transaction } from 'sequelize';
import sequelizeConfig from 'src/config/sequelize.config';
import { CreateEquipmentPaymentDTO } from './dto';
import EquipmentPayment from 'src/models/equiment/equitment_payment.model';
import Equipment from 'src/models/equiment/equitments.model';
import Payment from 'src/models/payment/payment.model';
import PaymentMethod from 'src/models/payment/payments_method.model';
import { PaymentTypeEnum } from 'src/app/enums/user/paymentType.enum';
import PaymentStatus from 'src/models/payment/payments_status.model';

@Injectable()
export class UserEquipmentService {

  async getData(
      user_id: number
  ) { 
    try {

        const equiments = await Payment.findAll({
            where: {type_id: PaymentTypeEnum.Equiment},
            attributes: ['id', 'receipt_number', 'total_price', 'updated_at'],
            include: [
              {
                model: EquipmentPayment,
                where: {user_id},
                required: true
              },
              {
                model: PaymentStatus,
                attributes: ['id', 'name', 'color']
              },
              {
                model: PaymentMethod,
                attributes: ['id', 'name']
              }
            ]
        });

        

        return {
            data: {
              equiments
            },
        };
    } catch (error) {
        console.error(error);
        throw new BadRequestException(error.message); // Handle errors gracefully
    }
  }

  async dataSetup() {
    try {
      const payments_method = await PaymentMethod.findAll({
        attributes: ['id', 'name'],
        order: [['id', 'ASC']],
      });

      return { data: { payments_method } };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(userId: number, dto: CreateEquipmentPaymentDTO) {
    const sequelize = new Sequelize(sequelizeConfig);
    let transaction: Transaction;

    try {
      transaction = await sequelize.transaction();

      const equipment = await Equipment.findByPk(dto.equipments_id, { transaction });
      if (!equipment) throw new NotFoundException('Equipment not found!');

      if (typeof equipment.price !== 'number') throw new BadRequestException('Invalid equipment price');

      const paymentMethod = await PaymentMethod.findByPk(dto.payment_method_id, { transaction });
      if (!paymentMethod) throw new BadRequestException('Payment method not found!');

      const totalPrice = equipment.price * dto.qty;

      // Create payment
      const newPayment = await Payment.create({
        method_id: dto.payment_method_id,
        type_id: 3, // Equipment payment type
        status_id: 2, // Pending status
        total_price: totalPrice,
      }, { transaction });

      // Create equipment payment record
      const equipmentPayment = await EquipmentPayment.create({
        user_id: userId,
        equipments_id: dto.equipments_id,
        qty: dto.qty,
        payment_id: newPayment.id,
        total_price: totalPrice,
      }, { transaction });

      await transaction.commit();

      return {
        message: 'Purchase submitted and awaiting admin confirmation',
        data: {
          payment: newPayment,
          equipment_payment: equipmentPayment,
        },
      };

    } catch (error) {
      if (transaction) await transaction.rollback();
      throw new BadRequestException(error.message || 'Internal Server Error');
    }
  }
}
