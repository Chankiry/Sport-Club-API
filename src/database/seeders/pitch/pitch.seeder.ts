import Pitches from "../../../models/pitch/pitches.model";
import PitchesCategory from "../../../models/pitch/pitches_category.model";
import TimesType from "../../../models/pitch/times_type.model";
import DatesType from "../../../models/pitch/dates_type.model";
import TimesModel from "../../../models/pitch/times.model";
import DaysModel from "../../../models/pitch/days.model";
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
            await TimesModel.bulkCreate(pitchSeeder.times);
            console.log('\x1b[32m\nSeed times inserted successfully.');
            
        } catch (error) {
            console.error('Error seeding times:', error);
        }
        try {
            await DaysModel.bulkCreate(pitchSeeder.days);
            console.log('\x1b[32m\nSeed days inserted successfully.');
            
        } catch (error) {
            console.error('Error seeding days:', error);
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
    times: [
        {
            name: '6:00',
        },
        {
            name: '7:00',
        },
        {
            name: '8:00',
        },
        {
            name: '9:00',
        },
        {
            name: '10:00',
        },
        {
            name: '11:00',
        },
        {
            name: '12:00',
        },
        {
            name: '13:00',
        },
        {
            name: '14:00',
        },
        {
            name: '15:00',
        },
        {
            name: '16:00',
        },
        {
            name: '17:00',
        },
        {
            name: '18:00',
        },
        {
            name: '19:00',
        },
        {
            name: '20:00',
        },
        {
            name: '21:00',
        },
        {
            name: '22:00',
        },

    ],
    days: [
        {
            name: 'Monday',
        },
        {
            name: 'Tuesday',
        },
        {
            name: 'Wednesday',
        },
        {
            name: 'Thursday',
        },
        {
            name: 'Friday',
        },
        {
            name: 'Saturday',
        },
        {
            name: 'Sunday',
        },
    ],
    times_type: [
        {
            name: 'Off-Peak',
            from_time_id: 1,
            to_time_id: 4,
            price_multiplier: 0.8
        },
        {
            name: 'Regular',
            from_time_id: 5,
            to_time_id: 12,
            price_multiplier: 1
        },
        {
            name: 'Peak',
            from_time_id: 13,
            to_time_id: 16,
            price_multiplier: 1.2
        },
    ],
    dates_type: [
        {
            name: 'Weekday',
            from_day_id: 1,
            to_day_id: 5,
            price_multiplier: 1
        },
        {
            name: 'Weekend',
            from_day_id: 6,
            to_day_id: 7,
            price_multiplier: 1.2
        },
    ]

};