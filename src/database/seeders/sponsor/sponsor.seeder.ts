import Sponsor from "../../../models/sponsor/sponsors.model"; 


const now = new Date();
export class SponsorSeeder {

    seed = async () => {
        try {
            await Sponsor.bulkCreate(sponsorSeeder.sponsor);
            console.log('\x1b[32m\nSeed Sponsor inserted successfully.');
        } catch (error) {
            console.error('Error seeding orders:', error);
        }

    }
}

const sponsorSeeder = {
    sponsor: [
        {
            company_name: 'coca',
            sport_id: 1,
            drink_id: 1,
            created_at: now,
            updated_at: now,
        },
        {
            company_name: 'Pepsi',
            sport_id: 2,
            drink_id: 2,
            created_at: now,
            updated_at: now,
        },
        {
            company_name: 'Pocarisweat',
            sport_id: 3,
            drink_id: 3,
            created_at: now,
            updated_at: now,
        }
        
    ],
};