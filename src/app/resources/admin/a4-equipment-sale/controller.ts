// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminEquipmentSaleService } from './service';

@Controller()
export class AdminEquipmentSaleController {

    constructor(
        private readonly _service: AdminEquipmentSaleService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
