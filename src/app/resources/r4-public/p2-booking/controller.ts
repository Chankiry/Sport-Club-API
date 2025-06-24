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

    @Get('data-setup')
    async dataSetup(
        @Query('pitch_id') pitch_id?: number,
        @Query('date') date?: Date,
    ): Promise<any> {
        return await this._service.dataSetup(pitch_id, date);
    }
    
}
