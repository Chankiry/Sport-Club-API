import { Module } from '@nestjs/common';
import { PublicVenueController } from './controller';
import { PublicVenueService } from './service';

@Module({
  controllers: [PublicVenueController],
  providers: [PublicVenueService],
})
export class PublicVenueModule {}
