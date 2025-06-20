// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminPitchCategoryController } from './controller';
import { AdminPitchCategoryService }    from './service';
import { SequelizeModule } from '@nestjs/sequelize';
import PitchesCategory from 'src/models/pitch/pitches_category.model';
import { FileService } from 'src/app/services/file.service';

@Module({
    imports: [
    SequelizeModule.forFeature([PitchesCategory])
    ],
    controllers: [AdminPitchCategoryController],
    providers: [AdminPitchCategoryService ,FileService],
})
export class AdminPitchCategoryModule { }
