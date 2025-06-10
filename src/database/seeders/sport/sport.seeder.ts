import SportRating from "../../../models/sport/sport_ratings.model";
import Sports from "../../../models/sport/sports.model";

// import SportRating from "src/models/sport/sport_ratings.model";
const now = new Date();

export class SportSeeder {

    seed = async () => {
        try {
            await Sports.bulkCreate(sportSeeder.sport);
            console.log('\x1b[32m\nSeed sport inserted successfully.');
        } catch (error) {
            console.error('Error seeding orders:', error);
        }
        try {
            await SportRating.bulkCreate(sportSeeder.sport_ratings);
            console.log('\x1b[32m\nSeed sport rating inserted successfully.');
        } catch (error) {
            console.error('Error seeding orders:', error);
        }
      
    }
}

const sportSeeder = {
    sport: [
        {
            name : "Football",
            created_at : now,
            updated_at : now
        },
        {
            name : "Basketball",
            created_at : now,
            updated_at : now
        },
        {
            name : "Tennis",
            created_at : now,
            updated_at : now
        }
    ],
    sport_ratings: [
        {
            sport_id : 1,
            user_id: 1,
            rating : 5,
            description: 'Widely loved worldwide.',
            created_at: now,
            updated_at: now
        },
         {
            sport_id : 2,
            user_id: 1,
            rating : 3,
            description: 'Widely loved worldwide.',
            created_at: now,
            updated_at: now
        },
         {
            sport_id : 3,
            user_id: 1,
            rating : 4,
            description: 'Widely loved worldwide.',
            created_at: now,
            updated_at: now
        },
        {
            sport_id : 2,
            user_id: 3,
            rating : 4,
            description: 'Best place for basketball court.',
            created_at: now,
            updated_at: now
        }
    ]
};
