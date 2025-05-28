// =========================================================================>> Core Library
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtMiddleware } from 'src/app/middlewares/jwt.middleware';

import { UserBookingModule } from './u1-booking/module';

@Module({
    imports: [
        UserBookingModule
    ]
})

export class UserModule implements NestModule  { 
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtMiddleware)
            .forRoutes({ path: 'api/user/*', method: RequestMethod.ALL });
    }
}