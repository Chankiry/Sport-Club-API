
// ================================================================>> Core Library
import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BookingStatusEnum } from 'src/app/enums/user/BookingStatuses.enum';

// ================================================================>> Costom Library

export class UpdatePaymentDTO {

    @IsNumber()
    @IsNotEmpty()
    status_id: number;

    @IsNumber()
    @IsNotEmpty()
    method_id: number;
    
}

export class CreateUpdateDrinkPaymentDTO {

    @IsNumber()
    @IsNotEmpty()
    drink_id: number;

    @IsNumber()
    @IsNotEmpty()
    qty: number = 1;
    
    @IsNumber()
    @IsNotEmpty()
    total_price: number = 0;
}