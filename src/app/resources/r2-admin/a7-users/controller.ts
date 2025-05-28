// ===========================================================================>> Core Library
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminUserService } from './service';
import { CreateUserDTO } from './dto';

@Controller()
export class AdminUserController {

    constructor(
        private readonly _service: AdminUserService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

    @Post()
    async create(
      @Body()  body: CreateUserDTO
    ): Promise<any> {
        console.log(body)
        return await this._service.create(body);
    }

    @Post(':id')
    async update(
        @Param('id') id: number,
        @Body()  body: CreateUserDTO
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
