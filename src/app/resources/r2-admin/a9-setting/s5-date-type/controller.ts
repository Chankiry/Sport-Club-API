// ===========================================================================>> Core Library
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminDateTypeService } from './service';
import { CreateDateTypeDto, UpdateDateTypeDto } from './dto';

@Controller()
export class AdminDateTypeController {
  constructor(private readonly _service: AdminDateTypeService) {}

  @Get()
  async findAll() {
    return this._service.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreateDateTypeDto) {
    return this._service.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDateTypeDto) {
    return this._service.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this._service.delete(id);
  }
}