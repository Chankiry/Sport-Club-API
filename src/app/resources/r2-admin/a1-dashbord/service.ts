// ===========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize }       from 'sequelize';
import * as moment  from 'moment';
import User from 'src/models/user/user.model';


// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class AdminDashboardService {
    // ==================================================================>> Get data Dashboard
    async getData() { 
        try {
            
            return 'Welcome to Admin Dashboard';

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

    async getData111() { 
        try {
            
            const user = await User.findAll();
            return user;

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

}
