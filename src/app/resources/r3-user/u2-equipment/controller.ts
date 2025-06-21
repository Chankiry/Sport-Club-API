// ===========================================================================>> Core Library
import { Controller, Get, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { UserEquipmentService } from './service';

@Controller()
export class UserEquipmentController {

    constructor(
        private readonly _service: UserEquipmentService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

}
