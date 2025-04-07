// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminBlackListService } from './service';

@Controller()
export class AdminBlackListController {

    constructor(
        private readonly _service: AdminBlackListService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
