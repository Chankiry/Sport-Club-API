// ===========================================================================>> Core Library
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminSportService } from './service';
import { CreateSportDto, UpdateSportDto } from './dto';

@Controller()
export class AdminSportController {
  constructor(private readonly _service: AdminSportService) {}

  @Get()
  async getAll() {
    return await this._service.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this._service.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateSportDto) {
    return await this._service.create(dto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSportDto) {
    return await this._service.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this._service.delete(id);
  }
}
