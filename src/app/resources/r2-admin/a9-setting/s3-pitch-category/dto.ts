
// ================================================================>> Core Library
import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { AutoIncrement, Column, DataType, PrimaryKey } from 'sequelize-typescript';
// ================================================================>> Costom Library
export class CreatePitchCategoryDto {

  @IsOptional()
  @IsNumber()
  sport_id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  required_players?: number;

  @IsOptional()
  @IsNumber()
  volume?: number;



    @IsString()
    @Optional()
     image: string = 'static/sport-club/user/avatar.png';

  @IsOptional()
  @IsNumber()
  price?: number;
}
export class UpdatePitchCategoryDto extends PartialType(CreatePitchCategoryDto) {}