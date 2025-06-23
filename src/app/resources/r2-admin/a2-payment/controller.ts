// ===========================================================================>> Core Library
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminPaymentService } from './service';
import { CreateUpdateBookingDTO } from '../a3-booking/dto';
import { CreateUpdateDrinkPaymentDTO, UpdatePaymentDTO } from './dto';

@Controller()
export class AdminPaymentController {

    constructor(
        private readonly _service: AdminPaymentService
    ) { }

    @Get()
    async getData(
        @Query('user_id') user_id?: number,
        @Query('status_id') status_id?: number,
        @Query('method_id') method_id?: number,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ): Promise<any> {
        const filters = {
            user_id: user_id ? Number(user_id) : undefined,
            status_id: status_id ? Number(status_id) : undefined,
            method_id: method_id ? Number(method_id) : undefined,
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10
        };
        return await this._service.getData(filters);
    }

    @Get('data-setup')
    async dataSetup(
    ): Promise<any> {
        return await this._service.dataSetup();
    }

    @Get(':id')
    async view(
        @Param('id') id: number
    ): Promise<any> {
        return await this._service.view(Number(id));
    }

    @Post(':id')
    async update(
        @Param('id') id: number,
        @Body() body: UpdatePaymentDTO
    ): Promise<any> {
        return await this._service.update(Number(id), body);
    }

    @Post(':id/drink-payment')
    async createDrinkPayment(
        @Param('id') id: number,
        @Body() body: CreateUpdateDrinkPaymentDTO
    ): Promise<any> {
        return await this._service.createDrinkPayment(Number(id), body);
    }

    @Post('drink-payment/:id')
    async updateDrinkPayment(
        @Param('id') id: number,
        @Body() body: CreateUpdateDrinkPaymentDTO
    ): Promise<any> {
        return await this._service.updateDrinkPayment(Number(id), body);
    }

    @Delete('drink-payment/:id')
    async deleteDrinkPayment(
        @Param('id') id: number
    ): Promise<any> {
        return await this._service.deleteDrinkPayment(Number(id));
    }

}
