// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminEquipmentService } from './service';

@Controller()
export class AdminEquipmentController {

    constructor(
        private readonly _service: AdminEquipmentService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

    

}
