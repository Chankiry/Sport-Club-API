// ===========================>> DTO: dto.ts
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateSportDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string; // base64 or URI
}

export class UpdateSportDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
