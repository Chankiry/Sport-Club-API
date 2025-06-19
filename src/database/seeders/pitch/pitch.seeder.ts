import Pitches from "../../../models/pitch/pitches.model";
import PitchesCategory from "../../../models/pitch/pitches_category.model";
import TimesType from "../../../models/pitch/times_type.model";
import DatesType from "../../../models/pitch/dates_type.model";
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
        try {
            await TimesType.bulkCreate(pitchSeeder.times_type);
            console.log('\x1b[32m\nSeed times type inserted successfully.');
            
        } catch (error) {
            console.error('Error seeding times type:', error);
        }
        try {
            await DatesType.bulkCreate(pitchSeeder.dates_type);
            console.log('\x1b[32m\nSeed dates type inserted successfully.');    
            
        } catch (error) {
            console.error('Error seeding dates type:', error);
        }
        
    }
}

const pitchSeeder = {
    pitch_categories: [
        // Football
        {
            id: 1,
            sport_id: 1,
            image: "",
            name: "Small Football",
            required_players: 12,  // 6v6
            volume: 300,
            price: 20.0,
            created_at: now,
            updated_at: now,
        },
        {
            id: 2,
            sport_id: 1,
            image: "",
            name: "Big Football",
            required_players: 18,  // 9v9
            volume: 500,
            price: 35.0,
            created_at: now,
            updated_at: now,
        },
        // Basketball
        {
            id: 3,
            sport_id: 2,
            image: "",
            name: "Small Basketball",
            required_players: 6,   // 3v3
            volume: 150,
            price: 15.0,
            created_at: now,
            updated_at: now,
        },
        {
            id: 4,
            sport_id: 2,
            image: "",
            name: "Big Basketball",
            required_players: 10,  // 5v5
            volume: 250,
            price: 25.0,
            created_at: now,
            updated_at: now,
        },
        // Tennis
        {
            id: 5,
            sport_id: 3,
            image: "",
            name: "Small Tennis",
            required_players: 2,   // Singles
            volume: 100,
            price: 10.0,
            created_at: now,
            updated_at: now,
        },
        {
            id: 6,
            sport_id: 3,
            image: "",
            name: "Big Tennis",
            required_players: 4,   // Doubles
            volume: 120,
            price: 15.0,
            created_at: now,
            updated_at: now,
        }
    ],
    pitch: [
        // Football Small (category_id: 1)
        {
            category_id: 1,
            name: "Football Pitch A",
            created_at: now,
            updated_at: now,
        },
        {
            category_id: 1,
            name: "Football Pitch B",
            created_at: now,
            updated_at: now,
        },
        // Football Big (category_id: 2)
        {
            category_id: 2,
            name: "Football Pitch C",
            created_at: now,
            updated_at: now,
        },
        {
            category_id: 2,
            name: "Football Pitch D",
            created_at: now,
            updated_at: now,
        },
        // Basketball Small (category_id: 3)
        {
            category_id: 3,
            name: "Basketball Court 1",
            created_at: now,
            updated_at: now,
        },
        {
            category_id: 3,
            name: "Basketball Court 2",
            created_at: now,
            updated_at: now,
        },
        // Basketball Big (category_id: 4)
        {
            category_id: 4,
            name: "Basketball Court 3",
            created_at: now,
            updated_at: now,
        },
        {
            category_id: 4,
            name: "Basketball Court 4",
            created_at: now,
            updated_at: now,
        },
        // Tennis Small (category_id: 5)
        {
            category_id: 5,
            name: "Tennis Court A",
            created_at: now,
            updated_at: now,
        },
        {
            category_id: 5,
            name: "Tennis Court B",
            created_at: now,
            updated_at: now,
        },
        // Tennis Big (category_id: 6)
        {
            category_id: 6,
            name: "Tennis Court C",
            created_at: now,
            updated_at: now,
        },
        {
            category_id: 6,
            name: "Tennis Court D",
            created_at: now,
            updated_at: now,
        }
    ],
    times_type: [
        {
            from_time: '08:00',
            to_time: '9:00',
            price_multiplier: 1,
        },
        {
            from_time: '9:00',
            to_time: '10:00',
            price_multiplier: 1,
        },
        {
            from_time: '10:00',
            to_time: '11:00',
            price_multiplier: 1,
        },
        {
            from_time: '11:00',
            to_time: '12:00',
            price_multiplier: 1,
        },
        {
            from_time: '12:00',
            to_time: '13:00',
            price_multiplier: 1,
        },
        {
            from_time: '13:00',
            to_time: '14:00',
            price_multiplier: 1,
        },
        {
            from_time: '15:00',
            to_time: '16:00',
            price_multiplier: 1,
        },
        {
            from_time: '16:00',
            to_time: '17:00',
            price_multiplier: 1.2,
        },
        {
            from_time: '17:00',
            to_time: '18:00',
            price_multiplier: 1.2,
        },
        {
            from_time: '18:00',
            to_time: '19:00',
            price_multiplier: 1.4,
        },
        {
            from_time: '19:00',
            to_time: '20:00',
            price_multiplier: 1.4,
        },
        {
            from_time: '20:00',
            to_time: '21:00',
            price_multiplier: 1.4,
        },
        {
            from_time: '21:00',
            to_time: '22:00',
            price_multiplier: 1.4,
        },

    ],
    dates_type: [
        {
            day: 'Monday',
            price_multiplier: 1,
        },
        {
            day: 'Tuesday',
            price_multiplier: 1,
        },
        {
            day: 'Wednesday',
            price_multiplier: 1,
        },
        {
            day: 'Thursday',
            price_multiplier: 1,
        },
        {
            day: 'Friday',
            price_multiplier: 1,
        },
        {
            day: 'Saturday',
            price_multiplier: 1.2,
        },
        {
            day: 'Sunday',
            price_multiplier: 1.2,
        },
    ]

};