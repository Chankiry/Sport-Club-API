// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminUserService } from './service';

@Controller()
export class AdminUserController {

    constructor(
        private readonly _service: AdminUserService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
