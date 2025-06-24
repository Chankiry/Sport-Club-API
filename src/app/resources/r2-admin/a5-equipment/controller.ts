// ===========================================================================>> Core Library
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminEquipmentService } from './service';
import { CreateEquippmentDto } from './dto';

@Controller()
export class AdminEquipmentController {

    constructor(
        private readonly _service: AdminEquipmentService
    ) {}

    // @Get()
    // async getData():Promise<any> {
    //     const filters = {

    //     }
    // }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

    @Post()
    async create(
        @Body() body: CreateEquippmentDto
    ): Promise<any> {
        return await this._service.create(body);
    }

    @Post(':id')
    async update(
        @Param('id') id: number,
        @Body() body: CreateEquippmentDto
    ): Promise<any> {
        return await this._service.update(Number(id), body);
    }

    @Delete(':id')
    async delete(
        @Param('id') id: number,
    ): Promise<any> {
        return await this._service.delete(Number(id));
    }
}
