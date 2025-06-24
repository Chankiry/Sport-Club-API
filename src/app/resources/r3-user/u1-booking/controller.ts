// ===========================================================================>> Core Library
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { UserBookingService } from './service';
import UserDecorator from 'src/app/decorators/user.decorator';
import User from 'src/models/user/user.model';
import { CreateBookingUserDTO } from './dto';

@Controller()
export class UserBookingController {

    constructor(
        private readonly _service: UserBookingService
    ) { }

    @Get()
    async getData(
        @UserDecorator()    auth: User,
    ): Promise<any> {
        return await this._service.getData(auth.id);
    }

    @Post()
    async create(
        @UserDecorator()    auth: User,
        @Body()             body:   CreateBookingUserDTO
    ): Promise<any> {
        return await this._service.create(auth.id, body);
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
