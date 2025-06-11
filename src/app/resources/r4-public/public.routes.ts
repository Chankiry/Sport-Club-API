// ================================================================>> Core Library
import { Routes } from '@nestjs/core';
import { PublicBookingModule } from './p2-booking/module';
import { PublicHomeModule } from './p1-home/module';
import { PublicVenueModule } from './p3-venue/module';

// ================================================================>> Custom Library

// ===>> Module

export const publicRoutes: Routes = [
    {
        path: 'home',
        module: PublicHomeModule
    },
    {
        path: 'bookings',
        module: PublicBookingModule
    },
    {
        path: 'venue',
        module: PublicVenueModule
    },
];