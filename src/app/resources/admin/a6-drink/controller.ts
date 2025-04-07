// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminDrinkService } from './service';

@Controller()
export class AdminDrinkController {

    constructor(
        private readonly _service: AdminDrinkService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
