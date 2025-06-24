// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminEquipmentController } from './controller';
import { AdminEquipmentService }    from './service';
import { FileService } from 'src/app/services/file.service';

@Module({
    controllers: [AdminEquipmentController],
    providers: [AdminEquipmentService, FileService]
})
export class AdminEquipmentModule { }
