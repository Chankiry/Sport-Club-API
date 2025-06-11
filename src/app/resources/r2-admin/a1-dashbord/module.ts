// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminDashboardController } from './controller';
import { AdminDashboardService }    from './service';

@Module({
    controllers: [AdminDashboardController],
    providers: [AdminDashboardService]
})
export class AdminDashboardModule { }
