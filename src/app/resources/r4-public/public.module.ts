// =========================================================================>> Core Library
import { Module } from '@nestjs/common';
import { PublicHomeModule } from './p1-home/module';
import { PublicBookingModule } from './p2-booking/module';
import { PublicVenueModule } from './p3-venue/module';


@Module({
    imports: [
        PublicHomeModule,
        PublicBookingModule,
        PublicVenueModule
    ]
})

export class PublicModule { }