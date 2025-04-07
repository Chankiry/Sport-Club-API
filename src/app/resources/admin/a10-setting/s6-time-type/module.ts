// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminTimeTypeController } from './controller';
import { AdminTimeTypeService }    from './service';

@Module({
    controllers: [AdminTimeTypeController],
    providers: [AdminTimeTypeService]
})
export class AdminTimeTypeModule { }
