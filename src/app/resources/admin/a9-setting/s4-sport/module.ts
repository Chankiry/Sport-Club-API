// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminSportController } from './controller';
import { AdminSportService }    from './service';

@Module({
    controllers: [AdminSportController],
    providers: [AdminSportService]
})
export class AdminSportModule { }
