import Pitches from "../../../models/pitch/pitches.model";
import PitchesCategory from "../../../models/pitch/pitches_category.model";
const now = new Date();
export class PitchSeeder {

    seed = async () => {
        try {
            await PitchesCategory.bulkCreate(pitchSeeder.pitch_categories);
            console.log('\x1b[32m\nSeed pitch category inserted successfully.');
        } catch (error) {
            console.error('Error seeding orders:', error);
        }
        try {
            await Pitches.bulkCreate(pitchSeeder.pitch);
            console.log('\x1b[32m\nSeed pitch inserted successfully.');
        } catch (error) {
            console.error('Error seeding orders:', error);
        }
        
    }
}

const pitchSeeder = {
   pitch_categories: [
        {
            id: 1,
            sport_id: 1,
            name: "Standard 5v5",
            required_players: 10,
            volume: 300,
            price: 20.0,
            created_at: now,
            updated_at: now,
        },
        {
            id: 2,
            sport_id: 2,
            name: "Half Court",
            required_players: 6,
            volume: 150,
            price: 15.0,
            created_at: now,
            updated_at: now,
        }
   ],
    pitch: [
        {
            category_id: 1,
            name: "Football Pitch A",
            created_at: now,
            updated_at: now,
        },
        {
            category_id: 2,
            name: "Basketball Court 1",
            created_at: now,
            updated_at: now,
        }
    ]

};