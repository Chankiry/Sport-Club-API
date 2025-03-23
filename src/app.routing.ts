// ================================================================>> Core Library
import { Routes } from '@nestjs/core';

// ================================================================>> Custom Library
// Account
import { AuthModule } from './app/resources/account/auth/auth.module';
import { AdminModule } from './app/resources/admin/admin.module';

export const appRoutes: Routes = [{
    path: 'api',
    children: [
        {
            path: 'auth',
            module: AuthModule
        },
        {
            path: 'admin',
            module: AdminModule
        }
    ]
}];