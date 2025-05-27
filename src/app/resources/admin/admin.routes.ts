// ================================================================>> Core Library
import { Routes } from '@nestjs/core';

// ================================================================>> Custom Library
import { AdminDashboardModule } from './a1-dashbord/module';
import { AdminPaymentModule } from './a2-payment/module';
import { AdminEquipmentSaleModule } from './a4-equipment-sale/module';
import { AdminEquipmentModule } from './a5-equipment/module';
import { AdminDrinkModule } from './a6-drink/module';
import { AdminUserModule } from './a7-users/module';
import { AdminSponsorModule } from './a8-sponsor/module';
// import { AdminSportTeamModule } from './a9-sport-team/module';
import { AdminBookingModule } from './a3-booking/module';
import { adminSettingRoutes } from './a9-setting/setting.routes';

// ===>> Module

export const adminRoutes: Routes = [
    {
        path: 'dashboard',
        module: AdminDashboardModule
    },
    {
        path: 'payments',
        module: AdminPaymentModule
    },
    {
        path: 'bookings',
        module: AdminBookingModule
    },
    {
        path: 'equipment-sales',
        module: AdminEquipmentSaleModule
    },
    {
        path: 'equipments',
        module: AdminEquipmentModule
    },
    {
        path: 'drinks',
        module: AdminDrinkModule
    },
    {
        path: 'users',
        module: AdminUserModule
    },
    {
        path: 'sponsors',
        module: AdminSponsorModule
    },
    // {
    //     path: 'sport-teams',
    //     module: AdminSportTeamModule
    // },
    {
        path: 'setting',
        children: adminSettingRoutes
    },
];