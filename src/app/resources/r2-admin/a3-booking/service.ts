// ===========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize }       from 'sequelize';
import * as moment  from 'moment';


// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class AdminBookingService {
    // ==================================================================>> Get data Booking
    async getData() { 
        try {
            
            return 'Welcome to Admin Booking';

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

}
