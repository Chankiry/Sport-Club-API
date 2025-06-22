// ===========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize, Transaction }       from 'sequelize';
import * as moment  from 'moment';
import Booking from 'src/models/booking/bookings.model';
import { CreateUpdateBookingDTO } from './dto';
import sequelizeConfig from 'src/config/sequelize.config';
import Pitches from 'src/models/pitch/pitches.model';
import User from 'src/models/user/user.model';
import DatesType from 'src/models/pitch/dates_type.model';
import BookingStatus from 'src/models/booking/booking_status.model';
import TimesType from 'src/models/pitch/times_type.model';
import TimesModel from 'src/models/pitch/times.model';
import DaysModel from 'src/models/pitch/days.model';
import PitchesCategory from 'src/models/pitch/pitches_category.model';
import Payment from 'src/models/payment/payment.model';
import { PaymentStatusEnum } from 'src/app/enums/user/paymentStatus.enum';
import { PaymentTypeEnum } from 'src/app/enums/user/paymentType.enum';
import Sports from 'src/models/sport/sports.model';
import Blacklist from 'src/models/user/blacklists.model';
import PaymentStatus from 'src/models/payment/payments_status.model';
import { BookingStatusEnum } from 'src/app/enums/user/BookingStatuses.enum';


// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class AdminBookingService {

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
            key?: string;
            // sport_id?: number;
            time_id?: number;
            user_id?: number;
            date?: Date;
        }
    ) { 
        try {

            const start_date = this.startOfDay(filters.date);
            const end_date = this.endOfDay(filters.date)

            // Build where conditions
            const where: any = {
                ...(filters.key && {
                    [Op.or]: [
                        { phone: { [Op.like]: `%${filters.key}%` } },
                        { phone2: { [Op.like]: `%${filters.key}%` } }
                    ]
                }),
                ...({ date : { [Op.between]: [start_date, end_date] } }),
                ...(filters.time_id && { time_id : filters.time_id }),
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

            const today = new Date();
            const start_of_today = this.startOfDay(today);
            const end_of_today = this.endOfDay(today);

            const bookings_today = await Booking.findAll({
                where: {
                    date : { [Op.between]: [start_of_today, end_of_today] }
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
            
            const total_bookings= await Booking.count();

            const total_cancelled_bookings= await Booking.count({
                where: {booking_status_id: BookingStatusEnum.Cancelled}
            });

            const total_confirmed_bookings= await Booking.count({
                where: {booking_status_id: BookingStatusEnum.Confirmed}
            });

            const total_pending_bookings= await Booking.count({
                where: {booking_status_id: BookingStatusEnum.Pending}
            });

            const total_completed_bookings= await Booking.count({
                where: {booking_status_id: BookingStatusEnum.Completed}
            });

            return {
                data: {
                    total_cancelled_bookings,
                    total_confirmed_bookings,
                    total_pending_bookings,
                    total_completed_bookings,
                    total_bookings,
                    bookings,
                    bookings_today,
                    
                },
            };
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

    async create( body: CreateUpdateBookingDTO ) { 
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

            // Validate user_id
            const user = await User.findByPk(body.user_id);
            if (!user) {
                throw new BadRequestException('Incorrect user!')
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
                body,
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

    async update(id: number, body: CreateUpdateBookingDTO ) { 
        const sequelize = new Sequelize(sequelizeConfig);
        let transaction: Transaction;
        try {
            // Start the transaction
            transaction = await sequelize.transaction();
            
            let price_multiplier = 1;
            
            // Validate user_id
            const booking = await Booking.findByPk(id);
            if (!booking) {
                throw new BadRequestException('Incorrect booking!')
            }

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
                await transaction.rollback();
                throw new BadRequestException('Incorrect pitch!')
            }

            // Validate user_id
            const user = await User.findByPk(body.user_id);
            if (!user) {
                throw new BadRequestException('Incorrect user!')
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

            const newBooking = await Booking.update(
                body,
                {
                    where: {id},
                    transaction
                }
            )

            if(!newBooking){
                throw new BadRequestException("Can't create booking!")
            }

            const updated_booking = await Booking.findOne({
                where: {id},
                include: [
                    {
                        model: Payment
                    }
                ]
            })

            const payment = await Payment.update(
                {
                    total_price: updated_booking.price
                },
                {
                    where: {id: updated_booking.payment.id},
                    transaction
                }
            )
            
            if(!payment){
                throw new BadRequestException("Fail to create payment!")
            }
            

            await transaction.commit();

            const result = await Booking.findOne({
                where: {id},
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

    async dataSetup(
        pitch_id?: number,
        date: Date = new Date(),
    ) { 
        try {
            
            const start_date = this.startOfDay(date);
            const end_date = this.endOfDay(date)

            const sports = await Sports.findAll({
                attributes: ['id', 'name'],
                include: [
                    {
                        model: PitchesCategory,
                        include: [
                            {
                                model: Pitches
                            }
                        ]
                    }
                ]
            });

            const users = await User.findAll({
                attributes: ['id', 'name', 'email', 'phone', 'phone2'],
                include: [
                    {
                    model: Blacklist,
                    required: false, // LEFT JOIN
                    },
                ],
                where: {
                    '$blacklist.id$': null, // Only users without a blacklist
                },
            });

            const whereClauseBookeds: any = {
                ...({   date : { [Op.between]: [start_date, end_date] } }),
                ...(    pitch_id && { pitch_id : pitch_id }),
                ...( { status_id : { [Op.not]: BookingStatusEnum.Cancelled} }),
            }
            const bookeds = await Booking.findAll({
                where: whereClauseBookeds
            })

            // Step 1: Generate the list of allowed time strings
            const allowedTimeStrings = [];
            for (let hour = 6; hour <= 20; hour += 2) {
            allowedTimeStrings.push(`${hour}:00`);
            }

            // Step 2: Fetch all times from database
            const times = await TimesModel.findAll();

            // Step 3: Filter only the allowed times
            const filteredTimes = times.filter(time => allowedTimeStrings.includes(time.name));

            // Assume `bookeds` is the result from Booking.findAll()
            const bookedTimeIds = new Set(bookeds.map(booking => booking.time_id ));
            console.log(bookedTimeIds)
            const updatedTimes = filteredTimes.map(time => ({
                ...time.toJSON(),
                booked: bookedTimeIds.has(time.id),
            }));

            const booking_statuses = await BookingStatus.findAll({
                attributes: ['id', 'name', 'icon', 'color']
            })

            const payment_statuses = await PaymentStatus.findAll({
                attributes: ['id', 'name', 'color']
            })

            
            return {
                data:{
                    date: new Date,
                    booking_statuses,
                    payment_statuses,
                    sports,
                    users,
                    filteredTimes,
                    time_slots: updatedTimes
                }
            };

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message);
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
