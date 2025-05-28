// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { PublicVenueService } from './service';

@Controller()
export class PublicVenueController {

    constructor(
        private readonly _service: PublicVenueService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
