// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminEquipmentController } from './controller';
import { AdminEquipmentService }    from './service';

@Module({
    controllers: [AdminEquipmentController],
    providers: [AdminEquipmentService]
})
export class AdminEquipmentModule { }
