import EquipmentPayment from "../../../models/equiment/equitment_payment.model";
import Equipment from "../../../models/equiment/equitments.model";
const now = new Date();

export class EquipmentSeeder  {
    seed = async () => {
         try {
            await Equipment.bulkCreate(equipmentData.equipments);
            console.log('\x1b[32m\nSeed equipment payment inserted successfully.');
        } catch (error) {
            console.error('Error seeding equipment payment:', error);
        }
        try {
            await EquipmentPayment.bulkCreate(equipmentData.equipments_payment);
            console.log('\x1b[32m\nSeed equipments inserted successfully.');
        } catch (error) {
            console.error('Error seeding equipments:', error);
        }
    }
}

const equipmentData = {
    equipments: [
        {
            image: 'static/equipment/football.png',
            name: 'aadi aadi Trendy Lightweight Sports',
            sport_id: 1,
            price: 270,
            created_at: now,
            updated_at: now
        },
        {
            image: 'static/equipment/basketball.png',
            name: 'Latest Stylish Casual Sneaker Sports ',
            sport_id: 2,
            price: 180,
            created_at: now,
            updated_at: now
        },
        {
            image: 'static/equipment/tennis.png',
            name: 'DRACKFOOT Sport Shoe',
            sport_id: 3,
            price: 300,
            created_at: now,
            updated_at: now
        },
        {
            image: 'static/equipment/badminton.png',
            name: 'adidas Fussballliebe Competition Ball',
            sport_id: 1,
            price: 130,
            created_at: now,
            updated_at: now
        },
        {
            image: 'static/equipment/cricket.png',
            name: 'Cheap Ball Games',
            sport_id: 2,
            price: 120,
            created_at: now,
            updated_at: now
        },
         {
            image: 'static/equipment/basketball.png',
            name: 'MAPOL 200 Count Table Tennis Balls',
            sport_id: 3,
            price: 85,
            created_at: now,
            updated_at: now
        },
        {
            image: 'static/equipment/tennis.png',
            name: 'China Manufacture Polyester Football Sports',
            sport_id: 3,
            price: 70,
            created_at: now,
            updated_at: now
        },
        {
            image: 'static/equipment/badminton.png',
            name: 'HACKY SPORTS',
            sport_id: 2,
            price: 100,
            created_at: now,
            updated_at: now
        },
        {
            image: 'static/equipment/cricket.png',
            name: 'Soccer Uniform',
            sport_id: 1,
            price: 80,
            created_at: now,
            updated_at: now
        }
    ],
    equipments_payment: [
        {
            user_id: 1,
            equipments_id: 1,
            qty: 2,
            payment_id: 1,
            total_price: 500,
            created_at: now,
            updated_at: now
        },
        {
            user_id: 1,
            equipments_id: 1,
            qty: 2,
            payment_id:2,
            total_price: 550,
            created_at: now,
            updated_at: now
        },
         {
            user_id: 1,
            equipments_id: 1,
            qty: 2,
            payment_id: 1,
            total_price: 700,
            created_at: now,
            updated_at: now
        },
        {
            user_id: 2,
            equipments_id: 2,
            qty: 2,
            payment_id: 3,
            total_price: 650,
            created_at: now,
            updated_at: now
        },
         {
            user_id: 2,
            equipments_id: 2,
            qty: 1,
            payment_id: 3,
            total_price: 750,
            created_at: now,
            updated_at: now
        },
        {
            user_id: 2,
            equipments_id: 2,
            qty: 2,
            payment_id: 1,
            total_price: 650,
            created_at: now,
            updated_at: now
        },
         {
            user_id: 3,
            equipments_id: 3,
            qty: 2,
            payment_id: 3,
            total_price: 800,
            created_at: now,
            updated_at: now
        },
        {
            user_id: 3,
            equipments_id: 3,
            qty: 2,
            payment_id: 3,
            total_price: 750,
            created_at: now,
            updated_at: now
        },
        {
            user_id: 2,
            equipments_id: 3,
            qty: 3,
            payment_id: 3,
            total_price: 700,
            created_at: now,
            updated_at: now
        }
    ],   
};
