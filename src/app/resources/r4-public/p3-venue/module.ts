// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { PublicVenueController } from './controller';
import { PublicVenueService }    from './service';

@Module({
    controllers: [PublicVenueController],
    providers: [PublicVenueService]
})
export class PublicVenueModule { }
