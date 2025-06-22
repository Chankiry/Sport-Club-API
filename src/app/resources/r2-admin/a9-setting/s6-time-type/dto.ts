import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateTimeTypeDto {
  @IsNotEmpty()
  @IsString()
  from_time: string;

  @IsNotEmpty()
  @IsString()
  to_time: string;

  @IsOptional()
  @IsNumber()
  price_multiplier?: number;
}
export class UpdateTimeTypeDto extends PartialType(CreateTimeTypeDto) {}