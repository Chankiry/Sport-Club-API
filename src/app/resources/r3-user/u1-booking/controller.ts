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
    async getData(
        @Query('key') key?: string,
        // @Query('sport_id') sport_id?: number,
        @Query('date') date?: Date,
        @Query('time_id') time_id?: number,
        @Query('user_id') user_id?: number,
    ): Promise<any> {
        const filters = {
            key,
            // sport_id: sport_id ? Number(sport_id) : undefined,
            time_id: time_id ? Number(time_id) : undefined,
            user_id: user_id ? Number(user_id) : undefined,
            date: date ? date : new Date(),
        };

        return await this._service.getData(filters);
    }

}
