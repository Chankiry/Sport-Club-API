// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminUserController } from './controller';
import { AdminUserService }    from './service';

@Module({
    controllers: [AdminUserController],
    providers: [AdminUserService]
})
export class AdminUserModule { }
