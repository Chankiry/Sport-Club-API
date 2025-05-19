// ================================================================>> Third Party Library
import "colors";
import * as readlineSync from 'readline-sync';
import { Sequelize } from 'sequelize-typescript';

// ================================================================>> Costom Library
import sequelizeConfig from '../../config/sequelize.config';
import { UserSeeder } from './user/user.seeder';
import { BookingSeeder } from "./booking/booking.seeder";
import { DrinkSeeder } from "./drink/drink.seeder";
import { EquimentSeeder } from "./equiment/equiment.seeder";
import { PaymentSeeder } from "./payment/payment.seeder";
import { PitchSeeder } from "./pitch/pitch.seeder";
import { SponsorSeeder } from "./sponsor/sponsor.seeder";
import { SportSeeder } from "./sport/sport.seeder";

async function seeds() {
    const sequelize = new Sequelize(sequelizeConfig);

    try {
        // Check if there are any existing tables in the database
        const tableNames = await sequelize.getQueryInterface().showAllTables();
        if (tableNames.length > 0) {
            // Ask the user for confirmation
            const message = 'This will drop and seed agian. Are you sure you want to proceed?'.yellow;
            const confirmation = readlineSync.keyInYNStrict(message);

            if (!confirmation) {
                console.log('\nSeeders has been cancelled.'.cyan);
                process.exit(0);
            }
        }

        // drop all existing UserGroup in the database and recreate it again.
        await sequelize.sync({ force: true });

        /** @seedUser ======================================= */
        const userSeeder = new UserSeeder();
        await userSeeder.seed();
        
        /** @seedSport ======================================= */
        const sportSeeder = new SportSeeder();
        await sportSeeder.seed();
        
        /** @seedPitch ======================================= */
        const pitchSeeder = new PitchSeeder();
        await pitchSeeder.seed();
        
        /** @seedSponsor ======================================= */
        const sponsorSeeder = new SponsorSeeder();
        await sponsorSeeder.seed();
        
        /** @seedBooking ======================================= */
        const bookingSeeder = new BookingSeeder();
        await bookingSeeder.seed();
        
        /** @seedDrink ======================================= */
        const drinkSeeder = new DrinkSeeder();
        await drinkSeeder.seed();

        /** @seedPayment ======================================= */
        const paymentSeeder = new PaymentSeeder();
        await paymentSeeder.seed();
        
        /** @seedEquiment ======================================= */
        const equimentSeeder = new EquimentSeeder();
        await equimentSeeder.seed();
        
        // End of execution
        process.exit(0);
        
    } catch (error) {
        // Delete all if have a errors
        await sequelize.sync({ force: true });
        console.log('\x1b[31m%s\x1b[0m', error.message);
        process.exit(0);

    }
}

seeds();
