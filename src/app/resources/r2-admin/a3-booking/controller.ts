// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminBookingService } from './service';

@Controller()
export class AdminBookingController {

    constructor(
        private readonly _service: AdminBookingService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
