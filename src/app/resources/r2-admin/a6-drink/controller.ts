// ===========================================================================>> Core Library
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminDrinkService } from './service';
import { CreateDrinkDTO } from './dto';

@Controller()
export class AdminDrinkController {

    constructor(
        private readonly _service: AdminDrinkService
    ) {}
    @Get()
    getOne(@Param('id') id: number) {
        return this._service.getData();
    }

    @Post()
    async create(
      @Body()  body: CreateDrinkDTO
    ): Promise<any> {
        console.log(body)
        return await this._service.create(body);
    }

    @Post(':id')
    async update(
        @Param('id') id: number,
        @Body()  body: CreateDrinkDTO
    ): Promise<any> {
        console.log(id);

        return await this._service.update(id, body);
    }
    
    @Delete(':id')
    async delete(
        @Param('id') id: number
    ): Promise<any> {
        console.log(id);
        return await this._service.delete(id);
    }
    
}
