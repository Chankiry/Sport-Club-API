// ===========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize, Transaction }       from 'sequelize';
import * as moment  from 'moment';
import { CreateBookingUserDTO } from './dto';
import sequelizeConfig from 'src/config/sequelize.config';
import Pitches from 'src/models/pitch/pitches.model';
import PitchesCategory from 'src/models/pitch/pitches_category.model';
import BookingStatus from 'src/models/booking/booking_status.model';
import TimesModel from 'src/models/pitch/times.model';
import DaysModel from 'src/models/pitch/days.model';
import Booking from 'src/models/booking/bookings.model';
import Payment from 'src/models/payment/payment.model';
import { PaymentStatusEnum } from 'src/app/enums/user/paymentStatus.enum';
import { PaymentTypeEnum } from 'src/app/enums/user/paymentType.enum';
import Sports from 'src/models/sport/sports.model';
import User from 'src/models/user/user.model';
import DatesType from 'src/models/pitch/dates_type.model';
import TimesType from 'src/models/pitch/times_type.model';
import DrinksPayment from 'src/models/drink/drink_payments.model';
import Drink from 'src/models/drink/drinks.model';
import PaymentStatus from 'src/models/payment/payments_status.model';
import PaymentMethod from 'src/models/payment/payments_method.model';
import { BookingStatusEnum } from 'src/app/enums/user/BookingStatuses.enum';


// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class UserBookingService {
    // ==================================================================>> Get data Booking

    async getData(
        user_id: number
    ) { 
        try {

            const bookings = await Booking.findAll({
                where: {user_id},
                attributes:['id', 'phone', 'phone2', 'created_at', 'updated_at'],
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
                                        attributes: ['id', 'name'],
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: TimesModel,
                        attributes: ['id', 'name']
                    },
                    {
                        model: Payment,
                        attributes: ['id', 'receipt_number', 'total_price', 'updated_at'],
                        include: [
                            {
                                model: PaymentStatus,
                                attributes: ['id', 'name', 'color']
                            },
                            {
                                model: PaymentMethod,
                                attributes: ['id', 'name']
                            }
                        ]
                    },
                    {
                        model: BookingStatus,
                        attributes: ['id', 'name', 'icon', 'color']
                    },
                    {
                        model: DrinksPayment,
                        attributes: ['id', 'qty', 'total_price'],
                        include: [
                            {
                                model: Drink,
                                attributes: ['id', 'name', 'image', 'price']
                            }
                        ]
                    }
                ]
            });
            
            const total_bookings= await Booking.count({
                where: {user_id}
            });

            const total_cancelled_bookings= await Booking.count({
                where: {user_id, booking_status_id: BookingStatusEnum.Cancelled}
            });

            const total_confirmed_bookings= await Booking.count({
                where: {user_id, booking_status_id: BookingStatusEnum.Confirmed}
            });

            const total_pending_bookings= await Booking.count({
                where: {user_id, booking_status_id: BookingStatusEnum.Pending}
            });

            const total_completed_bookings= await Booking.count({
                where: {user_id, booking_status_id: BookingStatusEnum.Completed}
            });

            return {
                data: {
                    total_cancelled_bookings,
                    total_confirmed_bookings,
                    total_pending_bookings,
                    total_completed_bookings,
                    total_bookings,
                    bookings,
                    
                },
            };
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

    private async findDateTypeForDay(day_id: number) {
        // Find matching date type where dayId is within the range
        const dateType = await DatesType.findOne({
            where: {
                from_day_id: {  [Op.lte]: day_id },
                to_day_id: {    [Op.gte]: day_id }
            },
            include: [
                { model: DaysModel, as: 'from_day' },
                { model: DaysModel, as: 'to_day' }
            ]
        });

        if (!dateType) {
            throw new BadRequestException(`No date type found for day ID ${day_id}`);
        }

        return dateType;
    }

    private async findTimeTypeForTime(time_id: number) {
        // Find matching date type where dayId is within the range
        const timeType = await TimesType.findOne({
            where: {
                from_time_id: {  [Op.lte]: time_id },
                to_time_id: {    [Op.gte]: time_id }
            },
            include: [
                { model: TimesModel, as: 'from_time' },
                { model: TimesModel, as: 'to_time' }
            ]
        });

        if (!timeType) {
            throw new BadRequestException(`No time type found for time ID ${time_id}`);
        }

        return timeType;
    }

        // ==================================================================>> Get data Booking
    // async getData(
    //     user_id: number,
    //     filters?: {
    //         key?: string;
    //         // sport_id?: number;
    //         time_id?: number;
    //     }
    // ) { 
    //     try {

    //         const start_date = this.startOfDay(filters.date);
    //         const end_date = this.endOfDay(filters.date)

    //         // Build where conditions
    //         const where: any = {
    //             ...(filters.key && {
    //                 [Op.or]: [
    //                     { phone: { [Op.like]: `%${filters.key}%` } },
    //                     { phone2: { [Op.like]: `%${filters.key}%` } }
    //                 ]
    //             }),
    //             ...({ date : { [Op.between]: [start_date, end_date] } }),
    //             ...(filters.time_id && { time_id : filters.time_id }),
    //         };
    //         const bookings = await Booking.findAll({
    //             where,
    //             include: [
    //                 {
    //                     model: Pitches,
    //                     attributes: ['id', 'name'],
    //                     include: [
    //                         {
    //                             model: PitchesCategory,
    //                             attributes: ['id', 'name'],
    //                             include: [
    //                                 {
    //                                     model: Sports,
    //                                     attributes: ['id', 'name'],
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     model: User,
    //                     attributes: ['id', 'name', 'avatar']
    //                 },
    //                 {
    //                     model: TimesModel,
    //                     attributes: ['id', 'name']
    //                 },
    //                 {
    //                     model: Payment
    //                 },
    //                 {
    //                     model: BookingStatus,
    //                     attributes: ['id', 'name', 'icon', 'color']
    //                 },
    //             ]
    //         });

    //         const today = new Date();
    //         const start_of_today = this.startOfDay(today);
    //         const end_of_today = this.endOfDay(today);

    //         const bookings_today = await Booking.findAll({
    //             where: {
    //                 date : { [Op.between]: [start_of_today, end_of_today] }
    //             },
    //             include: [
    //                 {
    //                     model: Pitches,
    //                     attributes: ['id', 'name'],
    //                     include: [
    //                         {
    //                             model: PitchesCategory,
    //                             attributes: ['id', 'name'],
    //                             include: [
    //                                 {
    //                                     model: Sports,
    //                                     attributes: ['id', 'name'],
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     model: User,
    //                     attributes: ['id', 'name', 'avatar']
    //                 },
    //                 {
    //                     model: TimesModel,
    //                     attributes: ['id', 'name']
    //                 },
    //                 {
    //                     model: Payment
    //                 },
    //                 {
    //                     model: BookingStatus,
    //                     attributes: ['id', 'name', 'icon', 'color']
    //                 },
    //             ]
    //         });
            
    //         const total_bookings= await Booking.count();

    //         const total_cancelled_bookings= await Booking.count({
    //             where: {booking_status_id: BookingStatusEnum.Cancelled}
    //         });

    //         const total_confirmed_bookings= await Booking.count({
    //             where: {booking_status_id: BookingStatusEnum.Confirmed}
    //         });

    //         const total_pending_bookings= await Booking.count({
    //             where: {booking_status_id: BookingStatusEnum.Pending}
    //         });

    //         const total_completed_bookings= await Booking.count({
    //             where: {booking_status_id: BookingStatusEnum.Completed}
    //         });

    //         return {
    //             data: {
    //                 total_cancelled_bookings,
    //                 total_confirmed_bookings,
    //                 total_pending_bookings,
    //                 total_completed_bookings,
    //                 total_bookings,
    //                 bookings,
    //                 bookings_today,
                    
    //             },
    //         };
    //     } catch (error) {
    //         console.error(error);
    //         throw new BadRequestException(error.message); // Handle errors gracefully
    //     }
    // }

    async create( user_id: number, body: CreateBookingUserDTO ) { 
        const sequelize = new Sequelize(sequelizeConfig);
        let transaction: Transaction;
        try {
            // Start the transaction
            transaction = await sequelize.transaction();
            
            let price_multiplier = 1;

            // Validate pitch_id
            const pitch = await Pitches.findOne({
                where: {id: body.pitch_id},
                include: [
                    {
                        model: PitchesCategory
                    }
                ]
            });
            if (!pitch) {
                throw new BadRequestException('Incorrect pitch!')
            }

            // Validate booking_status_id
            const bookingStatus = await BookingStatus.findByPk(body.booking_status_id);
            if (!bookingStatus) {
                throw new BadRequestException('Incorrect booking status!')
            }

            // Validate time_id
            const time = await TimesModel.findByPk(body.time_id);
            if (!time) {
                throw new BadRequestException('Incorrect time!')
            }

            // Validate date_type_id
            const timeType = await this.findTimeTypeForTime(body.time_id);
            if (!timeType) {
                throw new BadRequestException('Incorrect time type!')
            }
            else{
                price_multiplier = price_multiplier * timeType.price_multiplier;
                body.time_type_id = timeType.id;
            }

            if(body.duration_in_hours > 1){
                const timeType2 = await this.findTimeTypeForTime(body.time_id + 1);
                if (!timeType2) {
                    throw new BadRequestException('Incorrect time type!')
                }
                else{
                    price_multiplier = price_multiplier * timeType2.price_multiplier;
                }
            }

            // Validate date's day matches DaysModel
            const date = body.date;

            // Get day name in English format (e.g., "Monday")
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

            // Find matching day in DaysModel
            const dayRecord = await DaysModel.findOne({
                where: { name: dayName }
            });

            if (!dayRecord) {
                throw new BadRequestException(`Invalid day: ${dayName} not found in DaysModel`);
            }

            // Validate date_type_id
            const dateType = await this.findDateTypeForDay(dayRecord.id);
            if (!dateType) {
                throw new BadRequestException('Incorrect date type!')
            }
            else{
                price_multiplier = price_multiplier * dateType.price_multiplier;
                body.date_type_id = dateType.id;
            }

            body.price = Math.round((pitch.category.price * price_multiplier) * 100) / 100;

            const booking = await Booking.create(
                {
                    ...body,
                    user_id
                },
                {
                    transaction
                }
            )

            if(!booking){
                throw new BadRequestException("Can't create booking!")
            }
            
            // create payment for booking
            const payment = await Payment.create(
                {
                    booking_id: booking.id,
                    status_id: PaymentStatusEnum.Pending,
                    type_id: PaymentTypeEnum.Booking,
                    total_price: booking.price
                },
                {
                    transaction
                }
            )
            
            if(!payment){
                throw new BadRequestException("Fail to create payment!")
            }

            await transaction.commit();

            const result = await Booking.findOne({
                where: {id: booking.id},
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
                                        attributes: ['id', 'name'],
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: User,
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
                    },
                ]
            });

            return {
                data: {
                    booking: result,
                    payment
                }
            };

        } catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

    async calculatePrice(
        date: Date,
        time_id: number,
        pitch_id: number,
        duration_in_hours: number = 2
    ) { 
        try {

            let price_multiplier = 1;

            // Validate time_id
            const time = await TimesModel.findByPk(time_id);
            if (!time) {
                throw new BadRequestException('Incorrect time!')
            }

            // Validate date_type_id
            const timeType = await this.findTimeTypeForTime(time_id);
            if (!timeType) {
                throw new BadRequestException('Incorrect time type!')
            }
            else{
                price_multiplier = price_multiplier * timeType.price_multiplier;
            }

            if(duration_in_hours > 1){
                const timeType2 = await this.findTimeTypeForTime(time_id + 1);
                if (!timeType2) {
                    throw new BadRequestException('Incorrect time type!')
                }
                else{
                    price_multiplier = price_multiplier * timeType2.price_multiplier;
                }
            }

            const newDate = new Date(date)
            // Get day name in English format (e.g., "Monday")
            const dayName = newDate.toLocaleDateString('en-US', { weekday: 'long' });

            // Find matching day in DaysModel
            const dayRecord = await DaysModel.findOne({
                where: { name: dayName }
            });

            if (!dayRecord) {
                throw new BadRequestException(`Invalid day: ${dayName} not found in DaysModel`);
            }

            // Validate date_type_id
            const dateType = await this.findDateTypeForDay(dayRecord.id);
            if (!dateType) {
                throw new BadRequestException('Incorrect date type!')
            }
            else{
                price_multiplier = price_multiplier * dateType.price_multiplier;
            }

            // Validate pitch_id
            const pitch = await Pitches.findOne({
                where: {id: pitch_id},
                include: [
                    {
                        model: PitchesCategory
                    }
                ]
            });
            if (!pitch) {
                throw new BadRequestException('Incorrect pitch!')
            }

            return {
                data: {
                    price: Number(pitch.category.price * price_multiplier).toFixed(2)
                }
            }

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message);
        }
    }

}
