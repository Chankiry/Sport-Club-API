// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminPaymentService } from './service';
import { AdminPaymentDataSetup, ResponseGetReport } from './interface';

@Controller()
export class AdminPaymentController {

    constructor(
        private readonly _service: AdminPaymentService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
