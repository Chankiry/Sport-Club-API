// ===========================================================================>> Core Library
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminEquipmentSaleService } from './service';
import { CreateEquipmentsaleDTO } from './dto';

@Controller()
export class AdminEquipmentSaleController {

    constructor(private readonly _service: AdminEquipmentSaleService)
    { }

    @Get()
    async getData(@Query('user_id') user_id?: number): Promise<any> {
        return await this._service.getData(user_id);
    }
    @Get('setup')
    async getSetupData() {
    return await this._service.setupData();
    }

    @Post()
    async create(
        @Body() body: CreateEquipmentsaleDTO,): Promise<any>{
        return await this._service.create(body);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: CreateEquipmentsaleDTO
    ): Promise<any>{
        return await this._service.update(id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ message: string; id:string}> {
        return await this._service.delete(id);
    }
}
