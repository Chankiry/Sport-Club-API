// ===========================================================================>> Core Library
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminTimeTypeService } from './service';
import { CreateTimeTypeDto, UpdateTimeTypeDto } from './dto';

@Controller()
export class AdminTimeTypeController {
  constructor(private readonly service: AdminTimeTypeService) {}

  @Get()
  getAll() {
    return this.service.getData();
  }

  @Post()
  create(@Body() dto: CreateTimeTypeDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateTimeTypeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}