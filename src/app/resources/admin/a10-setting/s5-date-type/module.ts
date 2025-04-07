// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminDateTypeController } from './controller';
import { AdminDateTypeService }    from './service';

@Module({
    controllers: [AdminDateTypeController],
    providers: [AdminDateTypeService]
})
export class AdminDateTypeModule { }
