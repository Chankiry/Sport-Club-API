// ================================================================>> Core Library
import { Routes } from '@nestjs/core';

// ================================================================>> Custom Library
// Account
import { AuthModule } from './app/resources/account/auth/auth.module';
import { AdminModule } from './app/resources/admin/admin.module';
import { adminRoutes } from './app/resources/admin/admin.routes';

export const appRoutes: Routes = [{
    path: 'api',
    children: [
        {
            path: 'auth',
            module: AuthModule
        },
        {
            path: 'admin',
            children: adminRoutes
        }
    ]
}];