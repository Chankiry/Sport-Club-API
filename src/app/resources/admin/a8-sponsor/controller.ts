// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminSponsorService } from './service';

@Controller()
export class AdminSponsorController {

    constructor(
        private readonly _service: AdminSponsorService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
