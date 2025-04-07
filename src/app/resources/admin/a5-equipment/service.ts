// ===========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize }       from 'sequelize';
import * as moment  from 'moment';


// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class AdminEquipmentService {
    // ==================================================================>> Get data Equipment
    async getData() { 
        try {
            
            return 'Welcome to Admin Equipment';

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

}
