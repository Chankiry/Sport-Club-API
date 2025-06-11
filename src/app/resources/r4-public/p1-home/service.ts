// ===========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize }       from 'sequelize';
import * as moment  from 'moment';
import User from 'src/models/user/user.model';


// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class PublicHomeService {
    // ==================================================================>> Get data Dashboard
    async getData() { 
        try {
            
            return 'Welcome to Home';

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

}
