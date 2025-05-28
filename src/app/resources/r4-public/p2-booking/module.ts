// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { PublicBookingController } from './controller';
import { PublicBookingService }    from './service';

@Module({
    controllers: [PublicBookingController],
    providers: [PublicBookingService]
})
export class PublicBookingModule { }
