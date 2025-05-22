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
    ],
    times_type: [
              {
        from_time: '08:00',
        to_time: '12:00',
        price: 20.0,
      },
      {
        from_time: '13:00',
        to_time: '17:00',
        price: 22.5,
      },
      {
        from_time: '18:00',
        to_time: '22:00',
        price: 30.0,
      },

    ],
    dates_type: [
        {
            from_day: 'Saturday',
            to_day: 'Saturday',
            price: 20.0,
        },
        {
            from_day: 'Sunday',
            to_day: 'Sunday',
            price: 25.0,
        },
        {
            from_day: 'Monday',
            to_day: 'Friday',
            price: 15.0,
        }
    ]

};