// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminBlackListController } from './controller';
import { AdminBlackListService }    from './service';

@Module({
    controllers: [AdminBlackListController],
    providers: [AdminBlackListService]
})
export class AdminBlackListModule { }
