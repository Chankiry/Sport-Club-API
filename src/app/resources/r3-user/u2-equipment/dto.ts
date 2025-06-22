
// ================================================================>> Core Library
import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// ================================================================>> Costom Library

export class CreateEquipmentPaymentDTO {
  @IsNumber()
  equipments_id: number;

  @IsNumber()
  qty: number;

  @IsNumber()
  payment_method_id: number;
}
