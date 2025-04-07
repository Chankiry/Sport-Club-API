// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminEquipmentSaleController } from './controller';
import { AdminEquipmentSaleService }    from './service';

@Module({
    controllers: [AdminEquipmentSaleController],
    providers: [AdminEquipmentSaleService]
})
export class AdminEquipmentSaleModule { }
