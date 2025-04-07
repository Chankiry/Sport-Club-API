// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminSportTeamService } from './service';

@Controller()
export class AdminSportTeamController {

    constructor(
        private readonly _service: AdminSportTeamService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
