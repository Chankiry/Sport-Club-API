// ===========================================================================>> Core Library
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';

// ===========================================================================>> Third Party Library

// ===========================================================================>> Custom Library
import { AdminBlackListService } from './service';
import { CreateBlacklistDto, GetBlacklistQueryDto, UpdateBlacklistDto } from './dto';
@Controller('')
export class AdminBlackListController {
  constructor(private readonly _service: AdminBlackListService) {}

  // … other routes …
    @Get()
    async getData(@Query() query?: GetBlacklistQueryDto) {
    return await this._service.getData(query);
    }
  // ✅ setup & user routes first
    @Get('setup')
    getSetupData() {
        return this._service.getSetupData();
    }

  @Get('user/:userId')
  getUserInfo(@Param('userId') userId: string) {
    return this._service.getUserInfoById(+userId);
  }

  // ✅ Now the dynamic ID route
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._service.findOne(+id);
  }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateBlacklistDto,@Req() req: any) {
 
    return await this._service.update(+id, dto);
    
    }
  
    @Post()
    async create(@Body() dto: CreateBlacklistDto) {
    return await this._service.create(dto);
    }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._service.remove(+id);
  }
}
