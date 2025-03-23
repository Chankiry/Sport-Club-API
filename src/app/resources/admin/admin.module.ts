// =========================================================================>> Core Library
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AdminMiddleware } from 'src/app/middlewares/admin.middleware';

@Module({
    imports: [
    ]
})

export class AdminModule implements NestModule  { 
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AdminMiddleware)
            .forRoutes({ path: 'api/admin/*', method: RequestMethod.ALL });
    }
}