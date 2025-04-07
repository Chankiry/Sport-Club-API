// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminPitchService } from './service';

@Controller()
export class AdminPitchController {

    constructor(
        private readonly _service: AdminPitchService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
