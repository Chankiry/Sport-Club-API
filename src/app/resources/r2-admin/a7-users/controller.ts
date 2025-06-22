// ===========================================================================>> Core Library
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

// ===========================================================================>> Custom Library
import { AdminUserService } from './service';
import { CreateUserDTO } from './dto';

@Controller()
export class AdminUserController {

    constructor(
        private readonly _service: AdminUserService
    ) { }

    @Get()
    async getData(
        @Query('key') key?: string,
        @Query('role_id') role_id?: number,
        @Query('is_active') is_active?: number,
        // @Query('page') page?: number,
        // @Query('limit') limit?: number,
    ): Promise<any> {
        const filters = {
            key,
            role_id: role_id ? Number(role_id) : undefined,
            is_active: is_active !== undefined ? Number(is_active) : undefined,
            // page: page ? Number(page) : 1,
            // limit: limit ? Number(limit) : 10
        };
        return await this._service.getData(filters);
    }

    @Get('data-setup')
    async dataSetup(): Promise<any> {
        return await this._service.dataSetup();
    }

    @Post()
    async create(
        @Body() body: CreateUserDTO
    ): Promise<any> {
        return await this._service.create(body);
    }

    @Post(':id')
    async update(
        @Param('id') id: number,
        @Body() body: CreateUserDTO
    ): Promise<any> {
        return await this._service.update(Number(id), body);
    }
    
    @Delete(':id')
    async delete(
        @Param('id') id: number
    ): Promise<any> {
        return await this._service.delete(Number(id));
    }
}