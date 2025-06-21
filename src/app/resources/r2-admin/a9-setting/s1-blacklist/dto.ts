
// ================================================================>> Core Library
import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { AutoIncrement, Column, DataType, PrimaryKey } from 'sequelize-typescript';
import { Type } from 'class-transformer';
// ================================================================>> Costom Library
export class CreateBlacklistDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 15)
  phone1?: string;

  @IsOptional()
  @IsString()
  @Length(1, 15)
  phone2?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  reason?: string;

  @IsOptional()
  @IsNumber()
  user_id?: number; // ⚠️ Use snake_case to match model
}

export class UpdateBlacklistDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 15)
  phone1?: string;

  @IsOptional()
  @IsString()
  @Length(1, 15)
  phone2?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  reason?: string;

  @IsOptional()
  @IsNumber()
  user_id?: number;
}
export class GetBlacklistQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC';

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}