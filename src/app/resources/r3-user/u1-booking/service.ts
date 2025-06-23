// ===========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize }       from 'sequelize';
import * as moment  from 'moment';
import Booking from 'src/models/booking/bookings.model';
import Pitches from 'src/models/pitch/pitches.model';
import PitchesCategory from 'src/models/pitch/pitches_category.model';
import Sports from 'src/models/sport/sports.model';
import User from 'src/models/user/user.model';
import TimesModel from 'src/models/pitch/times.model';
import Payment from 'src/models/payment/payment.model';
import BookingStatus from 'src/models/booking/booking_status.model';
import { BookingStatusEnum } from 'src/app/enums/user/BookingStatuses.enum';


// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class UserBookingService {

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
    // ==================================================================>> Get data Booking
    async getData(
        filters?: {
            key?: string; // search term (phone, name)
            time_id?: number;
            user_id?: number; // now used as "customer ID"
            date?: Date;
        }
        ) {
        try {
            const start_date = this.startOfDay(filters.date);
            const end_date = this.endOfDay(filters.date);

            // Build where conditions
            const where: any = {
            // Filter by customer ID if provided
            ...(filters.user_id && { user_id: filters.user_id }),

            // Search by phone/name if key is provided
            ...(filters.key && {
                [Op.or]: [
                { phone: { [Op.like]: `%${filters.key}%` } },
                { phone2: { [Op.like]: `%${filters.key}%` } },
                {
                    '$user.name$': { [Op.like]: `%${filters.key}%` } // Match user's name
                }
                ]
            }),

            // Date range filter
            ...(filters.date && {
                date: { [Op.between]: [start_date, end_date] }
            }),

            // Time filter
            ...(filters.time_id && { time_id: filters.time_id })
            };

            const bookings = await Booking.findAll({
            where,
            include: [
                {
                model: Pitches,
                attributes: ['id', 'name'],
                include: [
                    {
                    model: PitchesCategory,
                    attributes: ['id', 'name'],
                    include: [
                        {
                        model: Sports,
                        attributes: ['id', 'name']
                        }
                    ]
                    }
                ]
                },
                {
                model: User,
                as: 'user', // Make sure this alias matches your association
                attributes: ['id', 'name', 'avatar']
                },
                {
                model: TimesModel,
                attributes: ['id', 'name']
                },
                {
                model: Payment
                },
                {
                model: BookingStatus,
                attributes: ['id', 'name', 'icon', 'color']
                }
            ]
            });

            const today = new Date();
            const start_of_today = this.startOfDay(today);
            const end_of_today = this.endOfDay(today);

            const bookings_today = await Booking.findAll({
            where: {
                date: { [Op.between]: [start_of_today, end_of_today] }
            },
            include: [
                {
                model: Pitches,
                attributes: ['id', 'name'],
                include: [
                    {
                    model: PitchesCategory,
                    attributes: ['id', 'name'],
                    include: [
                        {
                        model: Sports,
                        attributes: ['id', 'name']
                        }
                    ]
                    }
                ]
                },
                {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'avatar']
                },
                {
                model: TimesModel,
                attributes: ['id', 'name']
                },
                {
                model: Payment
                },
                {
                model: BookingStatus,
                attributes: ['id', 'name', 'icon', 'color']
                }
            ]
            });

            const total_bookings = await Booking.count();

            const total_cancelled_bookings = await Booking.count({
            where: { booking_status_id: BookingStatusEnum.Cancelled }
            });

            const total_confirmed_bookings = await Booking.count({
            where: { booking_status_id: BookingStatusEnum.Confirmed }
            });

            const total_pending_bookings = await Booking.count({
            where: { booking_status_id: BookingStatusEnum.Pending }
            });

            const total_completed_bookings = await Booking.count({
            where: { booking_status_id: BookingStatusEnum.Completed }
            });

            return {
            data: {
                total_cancelled_bookings,
                total_confirmed_bookings,
                total_pending_bookings,
                total_completed_bookings,
                total_bookings,
                bookings,
                bookings_today
            }
            };
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message);
        }
        }

}
