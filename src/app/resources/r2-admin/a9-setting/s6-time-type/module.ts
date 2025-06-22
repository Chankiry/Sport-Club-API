// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminTimeTypeController } from './controller';
import { AdminTimeTypeService }    from './service';
import { SequelizeModule } from '@nestjs/sequelize';
import TimesType from 'src/models/pitch/times_type.model';

@Module({
    imports: [SequelizeModule.forFeature([TimesType])],
    controllers: [AdminTimeTypeController],
    providers: [AdminTimeTypeService]
})
export class AdminTimeTypeModule { }
