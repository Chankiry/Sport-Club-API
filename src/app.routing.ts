// ================================================================>> Core Library
import { Routes } from '@nestjs/core';

// ================================================================>> Custom Library
// Account
import { AuthModule } from './app/resources/r1-account/auth/auth.module';
import { adminRoutes } from './app/resources/r2-admin/admin.routes';
import { userRoutes } from './app/resources/r3-user/user.routes';
import { publicRoutes } from './app/resources/r4-public/public.routes';

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
        },
        {
            path: 'user',
            children: userRoutes
        },
        {
            path: 'public',
            children: publicRoutes
        }
    ]
}];