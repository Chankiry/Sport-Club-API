// ===========================================================================>> Core Library
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminPitchCategoryService } from './service';
import { CreatePitchCategoryDto } from './dto';

@Controller()
export class AdminPitchCategoryController {

    constructor(
        private readonly _service: AdminPitchCategoryService
    ) { }

    @Get()
    async getData(): Promise<any> {
        return await this._service.getData();
    }

  @Post()
  async create(@Body() body: CreatePitchCategoryDto): Promise<any> {
    return await this._service.create(body);
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() body: CreatePitchCategoryDto
  ): Promise<any> {
    console.log(id);
    return await this._service.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    console.log(id);
    return await this._service.delete(id);
  }
  @Get('setup')
    async setup() {
    return await this._service.setupData();
    }

}
