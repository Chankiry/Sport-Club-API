// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminSportService } from './service';

@Controller()
export class AdminSportController {

    constructor(
        private readonly _service: AdminSportService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
