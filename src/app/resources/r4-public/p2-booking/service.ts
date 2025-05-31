// ===========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize }       from 'sequelize';
import * as moment  from 'moment';
import TimesType from 'src/models/pitch/times_type.model';
import DatesType from 'src/models/pitch/dates_type.model';


// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class PublicBookingService {
    // ==================================================================>> Get data Booking
    async getData() { 
        try {
            
            return 'Welcome to Public Booking';

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

    async getDataSetup() { 
        try {
            
            const times_types = await TimesType.findAll();

            const dates_types = await DatesType.findAll();

            return {
                data: {
                    times_types,
                    dates_types
                }
            };

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

}
