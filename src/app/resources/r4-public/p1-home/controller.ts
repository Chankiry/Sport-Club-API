// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { PublicHomeService } from './service';

@Controller()
export class PublicHomeController {

    constructor(
        private readonly _service: PublicHomeService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
