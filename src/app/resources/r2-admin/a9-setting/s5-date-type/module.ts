// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminDateTypeController } from './controller';
import { AdminDateTypeService }    from './service';
import { SequelizeModule } from '@nestjs/sequelize';
import DatesType from 'src/models/pitch/dates_type.model';

@Module({
     imports: [
            SequelizeModule.forFeature([DatesType]) // 👈 Required to register model for injection
        ],
    controllers: [AdminDateTypeController],
    providers: [AdminDateTypeService]
})
export class AdminDateTypeModule { }
