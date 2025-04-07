// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminSportTeamController } from './controller';
import { AdminSportTeamService }    from './service';

@Module({
    controllers: [AdminSportTeamController],
    providers: [AdminSportTeamService]
})
export class AdminSportTeamModule { }
