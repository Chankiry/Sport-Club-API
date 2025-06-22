// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminPitchController } from './controller';
import { AdminPitchService }    from './service';
import { SequelizeModule } from '@nestjs/sequelize';
import PitchesCategory from 'src/models/pitch/pitches_category.model';

@Module({
    imports: [
    SequelizeModule.forFeature([PitchesCategory])
    ],
    controllers: [AdminPitchController],
    providers: [AdminPitchService]
})
export class AdminPitchModule { }
