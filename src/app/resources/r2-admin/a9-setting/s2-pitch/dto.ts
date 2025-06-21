// src/admin/pitch/dto/pitches.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePitchDto {
  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdatePitchDto {
  @IsOptional()
  @IsNumber()
  category_id?: number;

  @IsOptional()
  @IsString()
  name?: string;
}
