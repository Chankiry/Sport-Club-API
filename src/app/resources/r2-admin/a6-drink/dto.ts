
// ================================================================>> Core Library
import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// ================================================================>> Costom Library

export class CreateDrinkDTO {

    @IsString()
    @IsNotEmpty()
    name: string; 

    @IsNumber()
    @IsNotEmpty()
    price:number;
    
    @IsString()
    @Optional()
    image: string = 'static/ecommerce/user/avatar.png';
}