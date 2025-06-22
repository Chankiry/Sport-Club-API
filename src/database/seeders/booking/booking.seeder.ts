import Booking from '../../../models/booking/bookings.model';
import BookingStatus  from '../../../models/booking/booking_status.model';
import { BookingStatusEnum } from '../../../app/enums/user/BookingStatuses.enum';
export class BookingSeeder {

    seed = async () => {
        try {
            await BookingStatus.bulkCreate(bookingData. statuses);
            console.log('\x1b[32m\nSeed booking statuses inserted successfully.');
        } catch (error) {
            console.error('Error seeding booking statuses:', error);
        }
        try {
            await Booking.bulkCreate(bookingData.bookings);
            console.log('\x1b[32m\nSeed bookings inserted successfully.');
        } catch (error) {
            console.error('Error seeding bookings:', error);
        }
    }
}

const bookingData = {
    statuses: [
      {
        id: BookingStatusEnum.Pending,
        name: 'Pending',
        icon: '🕒',
        color: '#facc15', // yellow
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: BookingStatusEnum.Confirmed,
        name: 'Confirmed',
        icon: '✅',
        color: '#22c55e', // green
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: BookingStatusEnum.Cancelled,
        name: 'Cancelled',
        icon: '❌',
        color: '#ef4444', // red
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: BookingStatusEnum.Completed,
        name: 'Completed',
        icon: '✔️',
        color: '#3b82f6', // blue
        created_at: new Date(),
        updated_at: new Date()
      }
    ],
        bookings: [
      {
        phone: '012345678',
        phone2: '098765432',
        pitch_id: 1,
        user_id: 1,
        date: new Date('2025-06-01'),
        date_type_id: 1,
        time_id: 5,
        time_type_id: 1,
        duration_in_hours: 2,
        needed_match: true,
        booking_status_id: 1,
        price: 20.00,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        phone: '011223344',
        phone2: null,
        pitch_id: 2,
        user_id: 2,
        date: new Date('2025-06-02'),
        date_type_id: 2,
        time_id: 7,
        time_type_id: 2,
        duration_in_hours: 2,
        needed_match: false,
        booking_status_id: 2,
        price: 12.50,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        phone: '097998877',
        phone2: '096112233',
        pitch_id: 1,
        user_id: 3,
        date: new Date('2025-06-03'),
        date_type_id: 1,
        time_id: 9,
        time_type_id: 1,
        duration_in_hours: 2,
        needed_match: true,
        booking_status_id: 3,
        price: 30.00,
        created_at: new Date(),
        updated_at: new Date()
      }
    ],


};