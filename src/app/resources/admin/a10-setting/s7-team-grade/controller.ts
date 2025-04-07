// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminTeamGradeService } from './service';

@Controller()
export class AdminTeamGradeController {

    constructor(
        private readonly _service: AdminTeamGradeService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
