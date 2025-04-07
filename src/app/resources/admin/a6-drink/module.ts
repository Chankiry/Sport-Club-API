// ===========================================================================>> Core Library
import { Module } from '@nestjs/common';

// ===========================================================================>> Third Party Library


// ===========================================================================>> Custom Library
import { AdminDrinkController } from './controller';
import { AdminDrinkService }    from './service';

@Module({
    controllers: [AdminDrinkController],
    providers: [AdminDrinkService]
})
export class AdminDrinkModule { }
