// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { PublicBookingService } from './service';

@Controller()
export class PublicBookingController {

    constructor(
        private readonly _service: PublicBookingService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
