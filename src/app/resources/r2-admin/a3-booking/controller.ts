// ===========================================================================>> Core Library
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminBookingService } from './service';
import { CreateBookingDTO } from './dto';

@Controller()
export class AdminBookingController {

    constructor(
        private readonly _service: AdminBookingService
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
    
    @Get('data-setup')
    async dataSetup(
        @Query('pitch_id') pitch_id?: number,
        @Query('date') date?: Date,
    ): Promise<any> {
        return await this._service.dataSetup(pitch_id, date);
    }

    @Post()
    async create(
        @Body() body: CreateBookingDTO
    ): Promise<any> {
        console.log(body)
        return await this._service.create(body);
    }

    @Post(':id')
    async update(
        @Param('id') id: number,
        @Body() body: CreateBookingDTO
    ): Promise<any> {
        console.log(body)
        return await this._service.update(Number(id), body);
    }

    @Get('calculate-price')
    async calculatePrice(
        @Query('date') date: Date,
        @Query('time_id') time_id: number,
        @Query('pitch_id') pitch_id: number,
    ): Promise<any> {
        return await this._service.calculatePrice(date, time_id, pitch_id);
    }


}
