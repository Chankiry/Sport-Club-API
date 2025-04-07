// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminTeamGradeController } from './controller';
import { AdminTeamGradeService }    from './service';

@Module({
    controllers: [AdminTeamGradeController],
    providers: [AdminTeamGradeService]
})
export class AdminTeamGradeModule { }
