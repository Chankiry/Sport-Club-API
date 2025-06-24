
// ================================================================>> Core Library
import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BookingStatusEnum } from 'src/app/enums/user/BookingStatuses.enum';

// ================================================================>> Costom Library

export class CreateBookingUserDTO {

    @IsString()
    @IsNotEmpty()
    phone: string;
    
    @Optional()
    phone2: string;
    
    @IsNumber()
    @IsNotEmpty()
    pitch_id: number;
    
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    date: Date;
    
    @IsNumber()
    @Optional()
    date_type_id: number = 1;
    
    @IsNumber()
    @IsNotEmpty()
    booking_status_id: number = BookingStatusEnum.Pending;
    
    @IsNumber()
    @Optional()
    time_type_id: number = 1;
    
    @IsNumber()
    @IsNotEmpty()
    time_id: number;
    
    @IsNumber()
    @IsNotEmpty()
    duration_in_hours: number = 2;
    
    @IsNumber()
    @IsNotEmpty()
    price: number = 0;
    
    
}