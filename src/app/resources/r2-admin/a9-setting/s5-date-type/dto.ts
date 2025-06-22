// dto/create-date-type.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class CreateDateTypeDto {
  @IsOptional()
  @IsString()
  day?: string;

  @IsNumber()
  @Min(0)
  price_multiplier: number;
}
export class UpdateDateTypeDto extends PartialType(CreateDateTypeDto) {}