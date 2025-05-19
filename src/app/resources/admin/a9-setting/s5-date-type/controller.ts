// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminDateTypeService } from './service';

@Controller()
export class AdminDateTypeController {

    constructor(
        private readonly _service: AdminDateTypeService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
