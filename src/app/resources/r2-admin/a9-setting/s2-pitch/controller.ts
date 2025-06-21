// ===========================================================================>> Core Library
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminPitchService } from './service';
import { CreatePitchDto, UpdatePitchDto } from './dto';

@Controller()
export class AdminPitchController {
  constructor(private readonly _service: AdminPitchService) {}

  @Get()
  async getAll() {
    return await this._service.getData();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this._service.View(id);
  }

  @Post()
  async create(@Body() dto: CreatePitchDto) {
    return await this._service.create(dto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePitchDto) {
    return await this._service.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this._service.delete(id);
  }
}