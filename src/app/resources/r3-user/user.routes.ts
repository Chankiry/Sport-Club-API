// ================================================================>> Core Library
import { Routes } from '@nestjs/core';

// ================================================================>> Custom Library

// ===>> Module
import { UserBookingModule } from './u1-booking/module';
import { UserEquipmentModule } from './u2-equipment/module';

export const userRoutes: Routes = [
    {
        path: 'bookings',
        module: UserBookingModule
    },
    {
        path: 'equipments',
        module: UserEquipmentModule
    }
];