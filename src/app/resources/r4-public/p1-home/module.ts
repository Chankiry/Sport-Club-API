// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { PublicHomeController } from './controller';
import { PublicHomeService }    from './service';

@Module({
    controllers: [PublicHomeController],
    providers: [PublicHomeService]
})
export class PublicHomeModule { }
