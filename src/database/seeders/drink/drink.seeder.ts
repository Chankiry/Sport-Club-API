
import Drink from "../../../models/drink/drinks.model";

const now = new Date();
export class DrinkSeeder {

    seed = async () => {
        try {
            await Drink.bulkCreate(drinkData.drinks);
            console.log('\x1b[32m\nSeed Drink inserted successfully.');
        } catch (error) {
            console.error('Error seeding orders:', error);
        }
    }
}

const drinkData = {
    drinks: [
         {
          image: null,
          name: 'Coca Cola',
          price: 1.5,
          created_at: now,
          updated_at: now,
        },
        {
          image: null,
          name: 'Sting',
          price: 1.2,
          created_at: now,
          updated_at: now,
        },
        {
          image: null,
          name: 'Pepsi',
          price: 1.4,
          created_at: now,
          updated_at: now,
        },
        {
          image: null,
          name: '7Up',
          price: 1.5,
          created_at: now,
          updated_at: now,
        },
        {
          image: null,
          name: 'Pocarisweat',
          price: 1.2,
          created_at: now,
          updated_at: now,
        },
    ],


};