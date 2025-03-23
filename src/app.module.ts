// =========================================================================>> Core Library
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';

// =========================================================================>> Third Party Library

// =========================================================================>> Custom Library
import { ExceptionErrorsFilter } from './app/exceptions/errors.filter';
import { ConfigModule } from './config/config.module';

// Middleware
import { JwtMiddleware } from './app/middlewares/jwt.middleware';

// Bass Controller
import { AppController } from './app.controller';
import { appRoutes } from './app.routing';
import { TimeoutInterceptor } from './app/interceptors/timeout.interceptor';

// Resources
import { AuthModule } from './app/resources/account/auth/auth.module';
import { AdminModule } from './app/resources/admin/admin.module';


// ======================================= >> Code Starts Here << ========================== //
@Module({
    controllers: [
        AppController
    ],
    imports: [
        ConfigModule,
        AuthModule,
        AdminModule,
        RouterModule.register(appRoutes)
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ExceptionErrorsFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TimeoutInterceptor
        },
    ]
})
/**
 * @author Kiry 
 */
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtMiddleware)
            .exclude(
                {
                    path: '', method: RequestMethod.GET
                },
                {
                    path: 'api/public', method: RequestMethod.GET
                },
                {
                    path: 'api/public/view-product/:id', method: RequestMethod.GET
                },
                {
                    path: 'api/auth/login', method: RequestMethod.POST
                },
                {
                    path: 'api/auth/sign-up', method: RequestMethod.POST
                },
                {
                    path: 'api/auth/register', method: RequestMethod.POST
                })
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}