// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminPitchController } from './controller';
import { AdminPitchService }    from './service';

@Module({
    controllers: [AdminPitchController],
    providers: [AdminPitchService]
})
export class AdminPitchModule { }
