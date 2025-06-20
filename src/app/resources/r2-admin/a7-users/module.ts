// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminUserController } from './controller';
import { AdminUserService }    from './service';
import { FileService } from 'src/app/services/file.service';

@Module({
    controllers: [AdminUserController],
    providers: [AdminUserService, FileService]
})
export class AdminUserModule { }
