// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminPitchCategoryController } from './controller';
import { AdminPitchCategoryService }    from './service';

@Module({
    controllers: [AdminPitchCategoryController],
    providers: [AdminPitchCategoryService]
})
export class AdminPitchCategoryModule { }
