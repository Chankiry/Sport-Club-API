// ===========================================================================>> Core Library
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

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

}
