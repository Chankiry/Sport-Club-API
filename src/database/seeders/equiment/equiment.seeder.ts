import EquipmentPayment from '../../../models/equiment/equitment_payment.model';
import Equipment from '../../../models/equiment/equitments.model';
const now = new Date();

export class EquipmentSeeder {
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
  };
}

const equipmentData = {
  equipments: [
    {
      image: '../assets/images/shoes6.avif',
      name: 'aadi aadi Trendy Lightweight Sports',
      description:
        'The shoes feature a breathable mesh outer material that allows air circulation, keeping your feet cool and dry during intense workout sessions',
      sport_id: 1,
      price: 270,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/soccer2.webp',
      name: 'Latest Stylish Casual Sneaker Sports ',
      description:
        'Sneakers are made for exercise and sports, but they are also very popular everyday shoes because they are so comfortable',
      sport_id: 2,
      price: 180,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/soccer1.jpg',
      name: 'DRACKFOOT Sport Shoe',
      description:
        'DRACKFOOT Sport Shoe is a versatile and stylish footwear option designed for both athletic performance and casual wear. These shoes are crafted with a focus on comfort, durability, and modern aesthetics.',
      sport_id: 3,
      price: 300,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/ball1.webp',
      name: 'adidas Fussballliebe Competition Ball',
      description:
        'The adidas Fussballliebe Competition Ball is a high-quality football designed for competitive play. It features a durable construction and advanced technology to ensure optimal performance on the field.',
      sport_id: 1,
      price: 130,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/ball2.jpeg',
      name: 'Cheap Ball Games',
      description:
        'Cheap Ball Games is a budget-friendly option for sports enthusiasts looking for affordable yet quality balls for various games. These balls are designed to provide good performance without breaking the bank.',
      sport_id: 2,
      price: 120,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/table2.webp',
      name: 'MAPOL 200 Count Table Tennis Balls',
      description:
        'MAPOL 200 Count Table Tennis Balls are high-quality, durable balls designed for table tennis enthusiasts. These balls are perfect for both recreational and competitive play, offering consistent bounce and performance.',
      sport_id: 3,
      price: 85,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/uniform6.jpg',
      name: 'China Manufacture Polyester Football Sports',
      description:
        'China Manufacture Polyester Football Sports is a high-quality football made from durable polyester material, designed for both training and competitive play. It offers excellent performance and longevity on the field.',
      sport_id: 3,
      price: 70,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/uniform11.webp',
      name: 'HACKY SPORTS',
      description:
        'HACKY SPORTS is a brand known for its high-quality sports apparel and equipment. They offer a wide range of products designed for various sports, ensuring comfort and performance for athletes.',
      sport_id: 2,
      price: 100,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/uniform10.webp',
      name: 'Soccer Uniform',
      description:
        'Soccer Uniform is a complete set of clothing designed for soccer players, including jerseys, shorts, and socks. Made from breathable and moisture-wicking materials, it ensures comfort and performance on the field.',
      sport_id: 1,
      price: 80,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/shoes7.avif',
      name: 'Nike Mercurial Vapor 16 Elite x Air Max 95 SE',
      description:
        'As we celebrate the 30th anniversary of the Air Max 95, it is only right we toast the rarefied AIR allegiance between the lifestyle icon and meteoric Mercurial.',
      sport_id: 1,
      price: 270,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/ball1.webp',
      name: 'Paris Saint-Germain Strike Third',
      description:
        'With design details specifically tailored for football is rising stars, a slim, streamlined fit ensures that nothing comes between you and the ball.',
      sport_id: 1,
      price: 130,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/uniform6.jpg',
      name: 'Nike Academy',
      description:
        'Optimise dribbling with textured casing, visibility with high-contrast graphics and accuracy with moulded grooves so you can focus on the game not the equipment.',
      sport_id: 1,
      price: 70,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/shoes6.avif',
      name: 'Nike P-6000',
      description:
        'The Nike P-6000 draws on the 2006 Nike Air Pegasus, bringing you a mash-up of iconic style that is breathable, comfortable and evocative of that early-2000s vibe.',
      sport_id: 2,
      price: 270,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/ball1.webp',
      name: 'Nike Strike',
      description:
        'On the pitch, passing, dribbling or scoring, this lightweight top is designed to work as hard as you do. With design details specifically tailored for football is rising stars, a classic fit helps limit distractions when you are on the pitch.',
      sport_id: 2,
      price: 130,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/uniform6.jpg',
      name: 'Nike Pitch',
      description:
        'Kick off your love for the game with the Nike Pitch Football. Made for your beginner training sessions and enhancing your footwork, this ball features a durable casing to help maintain consistent performance.',
      sport_id: 2,
      price: 70,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/shoes7.avif',
      name: 'Nike Air Force 1 Flyknit 2.0',
      description:
        'Inspired by the shoe that is been reigning the courts since 1982, the Nike Air Force 1 Flyknit 2.0 brings back the AF-1 in a lighter-than-ever design.Rocking Flyknit construction with classic AF-1 design lines.',
      sport_id: 3,
      price: 270,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/ball1.webp',
      name: 'Paris Saint-Germain 2024/25 Stadium Away',
      description:
        'Outfit future little stars in full with this three-piece kit that includes a team shirt with matching shorts and socks. Inspired by what the pros wear during play, our Stadium Collection has lightweight.',
      sport_id: 2,
      price: 130,
      created_at: now,
      updated_at: now,
    },
    {
      image: '../assets/images/uniform6.jpg',
      name: 'The Official Table Tennis Table',
      description:
        'MAPOL 300 Count Table Tennis Balls are high-quality, durable balls designed for table tennis enthusiasts. These balls are perfect for both recreational and competitive play, offering consistent bounce and performance.',
      sport_id: 3,
      price: 70,
      created_at: now,
      updated_at: now,
    },
  ],
  equipments_payment: [
    {
      user_id: 1,
      equipments_id: 1,
      qty: 2,
      payment_id: 1,
      total_price: 500,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 1,
      equipments_id: 1,
      qty: 2,
      payment_id: 2,
      total_price: 550,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 1,
      equipments_id: 1,
      qty: 2,
      payment_id: 1,
      total_price: 700,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 2,
      equipments_id: 2,
      qty: 2,
      payment_id: 3,
      total_price: 650,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 2,
      equipments_id: 2,
      qty: 1,
      payment_id: 3,
      total_price: 750,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 2,
      equipments_id: 2,
      qty: 2,
      payment_id: 1,
      total_price: 650,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 3,
      equipments_id: 3,
      qty: 2,
      payment_id: 3,
      total_price: 800,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 3,
      equipments_id: 3,
      qty: 2,
      payment_id: 3,
      total_price: 750,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 2,
      equipments_id: 3,
      qty: 3,
      payment_id: 3,
      total_price: 700,
      created_at: now,
      updated_at: now,
    },
     {
      user_id: 1,
      equipments_id: 1,
      qty: 2,
      payment_id: 1,
      total_price: 500,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 1,
      equipments_id: 1,
      qty: 2,
      payment_id: 2,
      total_price: 550,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 1,
      equipments_id: 1,
      qty: 2,
      payment_id: 1,
      total_price: 700,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 2,
      equipments_id: 2,
      qty: 2,
      payment_id: 3,
      total_price: 650,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 2,
      equipments_id: 2,
      qty: 1,
      payment_id: 3,
      total_price: 750,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 2,
      equipments_id: 2,
      qty: 2,
      payment_id: 1,
      total_price: 650,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 2,
      equipments_id: 3,
      qty: 2,
      payment_id: 3,
      total_price: 800,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 3,
      equipments_id: 3,
      qty: 2,
      payment_id: 3,
      total_price: 650,
      created_at: now,
      updated_at: now,
    },
    {
      user_id: 2,
      equipments_id: 3,
      qty: 1,
      payment_id: 3,
      total_price: 600,
      created_at: now,
      updated_at: now,
    },
  ],
};
