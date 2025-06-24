// ===========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize }       from 'sequelize';
import * as moment  from 'moment';
import TimesType from 'src/models/pitch/times_type.model';
import DatesType from 'src/models/pitch/dates_type.model';
import Booking from 'src/models/booking/bookings.model';
import Sports from 'src/models/sport/sports.model';
import PitchesCategory from 'src/models/pitch/pitches_category.model';
import Pitches from 'src/models/pitch/pitches.model';
import User from 'src/models/user/user.model';
import Blacklist from 'src/models/user/blacklists.model';
import { BookingStatusEnum } from 'src/app/enums/user/BookingStatuses.enum';
import TimesModel from 'src/models/pitch/times.model';
import BookingStatus from 'src/models/booking/booking_status.model';
import PaymentStatus from 'src/models/payment/payments_status.model';


// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class PublicBookingService {
    // ==================================================================>> Get data Booking
    async getData() { 
        try {
            
            const bookings = await Booking.findAll();
            return {
                data: bookings
            };

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

    private startOfDay = (date: Date): Date => {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
        return start;
    };
    
    private endOfDay = (date: Date): Date => {
        const end = new Date(date);
        end.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
        return end;
    };

    private getSevenDaysFrom(date: Date): { name: string; date: string }[] {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const sevenDays = [];

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(date);
            currentDate.setDate(date.getDate() + i);
            const dayName = days[currentDate.getDay()];
            const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
            sevenDays.push({ name: dayName, date: formattedDate });
        }

        return sevenDays;
    }

    async dataSetup(
        pitch_id?: number,
        date: Date = new Date(),
    ) {
    try {
        date = new Date(date);
        // Step 1: Generate 7 days with day names and dates
        const sevenDays = this.getSevenDaysFrom(date);

        // Step 2: Define start and end of the 7-day period
        const startDate = this.startOfDay(date);
        const endDate = this.endOfDay(new Date(date));
        endDate.setDate(endDate.getDate() + 6); // Extend to 7 days

        // Step 3: Fetch all times (allowed time slots)
        const allowedTimeStrings = [];
        for (let hour = 6; hour <= 20; hour += 2) {
        allowedTimeStrings.push(`${hour}:00`);
        }

        const times = await TimesModel.findAll();
        const filteredTimes = times.filter(time => allowedTimeStrings.includes(time.name));

        // Step 4: Fetch bookings for the 7-day period
        const whereClauseBookeds = {
        ...(pitch_id && { pitch_id }),
        date: { [Op.between]: [startDate, endDate] },
        booking_status_id: { [Op.not]: BookingStatusEnum.Cancelled },
        };

        const bookeds = await Booking.findAll({
        where: whereClauseBookeds,
        attributes: ['id', 'time_id', 'date'],
        });

        // Step 5: Group booked time IDs by date
        const bookedMap = new Map<string, Set<number>>();
        bookeds.forEach((booking) => {
        const bookingDate = booking.date.toISOString().split('T')[0]; // YYYY-MM-DD
        if (!bookedMap.has(bookingDate)) {
            bookedMap.set(bookingDate, new Set());
        }
        bookedMap.get(bookingDate)?.add(booking.time_id);
        });

        // Step 6: Map time slots to each day
        const timeSlotsByDay = sevenDays.map((day) => {
        const bookedTimes = bookedMap.get(day.date) || new Set();
        return {
            ...day,
            times: filteredTimes.map((time) => ({
            ...time.toJSON(),
            booked: bookedTimes.has(time.id),
            })),
        };
        });

        // Step 7: Fetch other data (sports, users, statuses, etc.)
        const sports = await Sports.findAll({ /* ... */ });
        const users = await User.findAll({ /* ... */ });
        const booking_statuses = await BookingStatus.findAll({ /* ... */ });
        const payment_statuses = await PaymentStatus.findAll({ /* ... */ });

        return {
        data: {
            date: new Date(),
            booking_statuses,
            payment_statuses,
            sports,
            users,
            time_slots: timeSlotsByDay, // Updated structure
        },
        };
    } catch (error) {
        console.error(error);
        throw new BadRequestException(error.message);
    }
    }

}
