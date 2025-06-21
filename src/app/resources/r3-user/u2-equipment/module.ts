// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { UserEquipmentController } from './controller';
import { UserEquipmentService }    from './service';

@Module({
    controllers: [UserEquipmentController],
    providers: [UserEquipmentService]
})
export class UserEquipmentModule { }
