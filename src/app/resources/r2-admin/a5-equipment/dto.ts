import { IsUrl, IsNotEmpty, IsString, isString, IsIn, IsInt } from "class-validator";
import { IsFloat } from "sequelize-typescript";

export class CreateEquippmentDto {
    @IsUrl()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsInt()
    sport_id: number;

    @IsNotEmpty()
    @IsInt()
    price: number;
}