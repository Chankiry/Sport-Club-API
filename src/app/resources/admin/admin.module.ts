// =========================================================================>> Core Library
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AdminMiddleware } from 'src/app/middlewares/admin.middleware';
import { AdminDashboardModule } from './a1-dashbord/module';
import { AdminPaymentModule } from './a2-payment/module';
import { AdminEquipmentSaleModule } from './a4-equipment-sale/module';
import { AdminEquipmentModule } from './a5-equipment/module';
import { AdminDrinkModule } from './a6-drink/module';
import { AdminUserModule } from './a7-users/module';
import { AdminSponsorModule } from './a8-sponsor/module';
// import { AdminSportTeamModule } from './a9-sport-team/module';
import { AdminBookingModule } from './a3-booking/module';

// Setting
import { AdminBlackListModule } from './a9-setting/s1-blacklist/module';
import { AdminPitchModule } from './a9-setting/s2-pitch/module';
import { AdminPitchCategoryModule } from './a9-setting/s3-pitch-category/module';
import { AdminSportModule } from './a9-setting/s4-sport/module';
import { AdminDateTypeModule } from './a9-setting/s5-date-type/module';
import { AdminTimeTypeModule } from './a9-setting/s6-time-type/module';
// import { AdminTeamGradeModule } from './a9-setting/s7-team-grade/module';

@Module({
    imports: [
        AdminDashboardModule,
        AdminPaymentModule,
        AdminEquipmentSaleModule,
        AdminEquipmentModule,
        AdminDrinkModule,
        AdminUserModule,
        AdminSponsorModule,
        // AdminSportTeamModule,
        AdminBookingModule,

        // Setting
        AdminBlackListModule,
        AdminPitchModule,
        AdminPitchCategoryModule,
        AdminSportModule,
        AdminDateTypeModule,
        AdminTimeTypeModule,
        // AdminTeamGradeModule,
    ]
})

export class AdminModule implements NestModule  { 
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AdminMiddleware)
            .forRoutes({ path: 'api/admin/*', method: RequestMethod.ALL });
    }
}