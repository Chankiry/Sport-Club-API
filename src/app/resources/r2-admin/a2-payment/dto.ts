
// ================================================================>> Core Library
import { IsNotEmpty, IsNumber } from 'class-validator';

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