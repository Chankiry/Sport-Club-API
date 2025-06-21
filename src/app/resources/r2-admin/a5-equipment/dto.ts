import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateEquippmentDto {
  @IsString()
  @IsOptional()
  image: string = 'static/ecommerce/user/avatar.png';

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  sport_id: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
