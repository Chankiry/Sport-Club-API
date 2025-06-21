// ================================================================>> Core Library
import { Routes } from '@nestjs/core';

// ================================================================>> Custom Library

// ===>> Module
import { UserBookingModule } from './u1-booking/module';

export const userRoutes: Routes = [
    {
        path: 'bookings',
        module: UserBookingModule
    },
    {
        path: 'equipments',
        module: UserBookingModule
    }
];