// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminSportController } from './controller';
import { AdminSportService }    from './service';
import { FileService } from 'src/app/services/file.service';

@Module({
    controllers: [AdminSportController],
    providers: [AdminSportService,FileService]
})
export class AdminSportModule { }
