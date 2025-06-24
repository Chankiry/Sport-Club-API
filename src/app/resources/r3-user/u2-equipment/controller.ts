// src/modules/user-equipment/controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserEquipmentService } from './service';
import { CreateEquipmentPaymentDTO } from './dto';
import UserDecorator from 'src/app/decorators/user.decorator';
import User from 'src/models/user/user.model';

@Controller()
export class UserEquipmentController {
  constructor(private readonly _service: UserEquipmentService) {}

  @Get()
  async getData(
      @UserDecorator()    auth: User,
  ): Promise<any> {
      return await this._service.getData(auth.id);
  }

  @Get('data-setup')
  async dataSetup() {
    return this._service.dataSetup();
  }

  @Post()
  async create(@UserDecorator() auth: User, @Body() dto: CreateEquipmentPaymentDTO) {
    return this._service.create(auth.id, dto);
  }
}
