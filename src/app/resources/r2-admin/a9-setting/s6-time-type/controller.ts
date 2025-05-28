// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminTimeTypeService } from './service';

@Controller()
export class AdminTimeTypeController {

    constructor(
        private readonly _service: AdminTimeTypeService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
