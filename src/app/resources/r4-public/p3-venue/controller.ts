// src/app/resources/r4-public/p3-venue/controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { PublicVenueService } from './service';

@Controller()
export class PublicVenueController {
  constructor(private readonly _service: PublicVenueService) {}

@Get('/sport-ratings')
getRatingsBySportId(@Query('sport_id') sportId: number) {
  return this._service.getSportRatingsBySportId(sportId); 
}
@Get('/pitch-categories')
getPitchCategoriesBySportId(@Query('sport_id') sportId: number) {
  return this._service.getPitchCategoriesBySportId(sportId);
}
}
