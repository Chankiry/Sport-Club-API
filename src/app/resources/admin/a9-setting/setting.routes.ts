// ================================================================>> Core Library
import { Routes } from '@nestjs/core';

// ================================================================>> Custom Librar
import { AdminBlackListModule } from './s1-blacklist/module';
import { AdminPitchModule } from './s2-pitch/module';
import { AdminPitchCategoryModule } from './s3-pitch-category/module';
import { AdminSportModule } from './s4-sport/module';
import { AdminDateTypeModule } from './s5-date-type/module';
import { AdminTimeTypeModule } from './s6-time-type/module';


export const adminSettingRoutes: Routes = [
    {
        path: 'blacklist',
        module: AdminBlackListModule
    },
    {
        path: 'pitches',
        module: AdminPitchModule
    },
    {
        path: 'pitches-categories',
        module: AdminPitchCategoryModule
    },
    {
        path: 'sports',
        module: AdminSportModule
    },
    {
        path: 'date-types',
        module: AdminDateTypeModule
    },
    {
        path: 'time-types',
        module: AdminTimeTypeModule
    },
];