// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { UserBookingController } from './controller';
import { UserBookingService }    from './service';

@Module({
    controllers: [UserBookingController],
    providers: [UserBookingService]
})
export class UserBookingModule { }
