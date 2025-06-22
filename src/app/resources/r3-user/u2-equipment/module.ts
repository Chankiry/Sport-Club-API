import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import EquipmentPayment from 'src/models/equiment/equitment_payment.model';
import Equipment from 'src/models/equiment/equitments.model';
import Payment from 'src/models/payment/payment.model';
import User from 'src/models/user/user.model';

import { UserEquipmentController } from './controller';
import { UserEquipmentService } from './service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      EquipmentPayment,
      Equipment,
      Payment,
      User,
    ]),
  ],
  controllers: [UserEquipmentController],
  providers: [UserEquipmentService],
})
export class UserEquipmentModule {}
