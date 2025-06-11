// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { UserBookingService } from './service';

@Controller()
export class UserBookingController {

    constructor(
        private readonly _service: UserBookingService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
