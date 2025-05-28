// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminSponsorController } from './controller';
import { AdminSponsorService }    from './service';

@Module({
    controllers: [AdminSponsorController],
    providers: [AdminSponsorService]
})
export class AdminSponsorModule { }
