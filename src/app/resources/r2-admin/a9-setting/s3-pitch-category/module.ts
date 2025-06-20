// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminPitchCategoryController } from './controller';
import { AdminPitchCategoryService }    from './service';
import { SequelizeModule } from '@nestjs/sequelize';
import PitchesCategory from 'src/models/pitch/pitches_category.model';

@Module({
    imports: [
    SequelizeModule.forFeature([PitchesCategory])
    ],
    controllers: [AdminPitchCategoryController],
    providers: [AdminPitchCategoryService]
})
export class AdminPitchCategoryModule { }
