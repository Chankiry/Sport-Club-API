// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminBookingController } from './controller';
import { AdminBookingService }    from './service';

@Module({
    controllers: [AdminBookingController],
    providers: [AdminBookingService]
})
export class AdminBookingModule { }
