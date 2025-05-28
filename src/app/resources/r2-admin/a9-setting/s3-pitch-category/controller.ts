// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminPitchCategoryService } from './service';

@Controller()
export class AdminPitchCategoryController {

    constructor(
        private readonly _service: AdminPitchCategoryService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
