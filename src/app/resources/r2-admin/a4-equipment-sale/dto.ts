import { IsNumber, IsOptional, Min } from 'class-validator';

export class CreateEquipmentsaleDTO {
  @IsOptional()
  @IsNumber()
  user_id: number;

  @IsNumber()
  equipments_id: number;

  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  qty: number;

  @IsOptional()
  @IsNumber()
  payment_id?: number;

  @IsNumber()
  total_price: number;
}
