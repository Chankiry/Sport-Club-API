// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminEquipmentSaleController } from './controller';
import { AdminEquipmentSaleService } from './service';
import EquipmentPayment from 'src/models/equiment/equitment_payment.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [
    SequelizeModule.forFeature([EquipmentPayment]), // ✅ Required for injecting model
  ],
    controllers: [AdminEquipmentSaleController],
    providers: [AdminEquipmentSaleService]
})
export class AdminEquipmentSaleModule { }
