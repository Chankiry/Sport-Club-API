// ===========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize, Transaction }       from 'sequelize';
import * as moment  from 'moment';
import Payment from 'src/models/payment/payment.model';
import PaymentStatus from 'src/models/payment/payments_status.model';
import PaymentType from 'src/models/payment/payments_types.model';
import { PaymentTypeEnum } from 'src/app/enums/user/paymentType.enum';
import Booking from 'src/models/booking/bookings.model';
import User from 'src/models/user/user.model';
import { CreateUpdateDrinkPaymentDTO, UpdatePaymentDTO } from './dto';
import sequelizeConfig from 'src/config/sequelize.config';
import Drink from 'src/models/drink/drinks.model';
import DrinksPayment from 'src/models/drink/drink_payments.model';
import PaymentMethod from 'src/models/payment/payments_method.model';
import { PaymentStatusEnum } from 'src/app/enums/user/paymentStatus.enum';
import BookingStatus from 'src/models/booking/booking_status.model';
import TimesModel from 'src/models/pitch/times.model';
import Blacklist from 'src/models/user/blacklists.model';
import Sports from 'src/models/sport/sports.model';


// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class AdminPaymentService {
    // ==================================================================>> Get data Payment
    async getData(
        filters?: {
            user_id?: number;
            status_id?: number;
            method_id?: number;
            page?: number;
            limit?: number;
        }
    ) { 
        try {
            const page = filters?.page || 1;
            const limit = filters?.limit || 10;
            const offset = (page - 1) * limit;

            // Build where conditions
            const whereConditions: any = {
                ...({ type_id : PaymentTypeEnum.Booking }),
                ...(filters.user_id && { user_id : filters.user_id }),
                ...(filters.status_id && { status_id : filters.status_id }),
                ...(filters.method_id && { user_id : filters.method_id }),
                ...(filters.method_id && { user_id : filters.method_id }),
            };
            
            const payments = await Payment.findAll({
                where: whereConditions,
                attributes: ['id', 'receipt_number', 'booking_id', 'status_id', 'method_id', 'type_id', 'total_price', 'created_at', 'updated_at'],
                include: [
                    {
                        model: PaymentStatus,
                        attributes: ['id', 'name', 'color'],
                    },
                    {
                        model: Booking,
                        attributes: ['id'],
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'name', 'avatar']
                            }
                        ]
                    }
                ],
                limit,
                offset,
                order: [['created_at', 'DESC']]
            });

            const total = await Payment.count({
                where: {type_id: PaymentTypeEnum.Booking}
            });

            const payment_methods = await PaymentMethod.findAll({
                include: [
                    {
                        model: Payment,
                        where:{status_id: PaymentStatusEnum.Completed, type_id: PaymentTypeEnum.Booking}
                    }
                ]
            })

            // Map each payment method into your desired format
            const format_payment_methods = payment_methods.map(pm => {
                const payments = pm.payments || [];
                const n_of_payments = payments.length;
                const total_amount = payments.reduce((sum, payment) => sum + (payment.total_price || 0), 0);

                return {
                    id: pm.id,
                    name: pm.name,
                    n_of_payments,
                    total_amount: parseFloat(total_amount.toFixed(2)) // keep only 2 decimal places
                };
            });

            const total_revenue = await Payment.findAll({
                where:{
                    status_id: PaymentStatusEnum.Completed
                }
            })

            const total_pending = await Payment.findAll({
                where:{
                    status_id: PaymentStatusEnum.Pending
                }
            })

            const total_fail = await Payment.findAll({
                where:{
                    status_id: PaymentStatusEnum.Fail
                }
            })

            return {
                data: {
                    payment_methods: format_payment_methods,
                    total_revenue,
                    total_pending,
                    total_fail,
                    payments,
                },
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            };

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message);
        }
    }

    async dataSetup() { 
        try {

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

            const booking_statuses = await BookingStatus.findAll({
                attributes: ['id', 'name', 'icon', 'color']
            })

            const payment_statuses = await PaymentStatus.findAll({
                attributes: ['id', 'name', 'color']
            })

            const payment_methods = await PaymentMethod.findAll({
                attributes: ['id', 'name']
            })

            
            return {
                data:{
                    booking_statuses,
                    payment_statuses,
                    payment_methods,
                    users,
                }
            };

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message);
        }
    }

    async view(id: number) {
        try{

            const payment = await Payment.findOne({
                where: {id},
                attributes: ['id', 'receipt_number', 'booking_id', 'status_id', 'method_id', 'type_id', 'total_price', 'created_at', 'updated_at'],
                include: [
                    {
                        model: PaymentStatus,
                        attributes: ['id', 'name', 'color'],
                    },
                    {
                        model: Booking,
                        attributes: ['id'],
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'name', 'avatar']
                            }
                        ]
                    },
                    {
                        model: DrinksPayment,
                        attributes: ['id', 'drink_id', 'booking_id', 'qty', 'total_price'],
                        include: [
                            {
                                model: Drink,
                                attributes: ['id', 'name', 'image', 'price']
                            }
                        ]
                    }
                ]
            });

            return {
                data: payment
            }

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message);
        }
    }

    async update( id: number, body: UpdatePaymentDTO ) { 
        const sequelize = new Sequelize(sequelizeConfig);
        let transaction: Transaction;
        try {
            // Start the transaction
            transaction = await sequelize.transaction();

            // Validate payment_id
            const payment = await Payment.findOne({
                where: {id, type_id: PaymentTypeEnum.Booking}
            });
            if (!payment) {
                throw new BadRequestException('Incorrect payment id!')
            }

            const status = await PaymentStatus.findByPk(body.status_id);
            if (!status) {
                throw new BadRequestException('Incorrect payment status!')
            }

            const method = await PaymentMethod.findByPk(body.method_id);
            if (!method) {
                throw new BadRequestException('Incorrect payment method!')
            }

            const updated_payment = await Payment.update(
                body,
                {
                    where: {id},
                    transaction
                }
            )

            if(updated_payment[0]) {
                throw new BadRequestException("Can't update payment")
            }

            await transaction.commit();

            return {
                data: {
                    payment: updated_payment
                }
            };

        } catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

    async createDrinkPayment( payment_id: number, body: CreateUpdateDrinkPaymentDTO ) { 
        const sequelize = new Sequelize(sequelizeConfig);
        let transaction: Transaction;
        try {
            // Start the transaction
            transaction = await sequelize.transaction();

            // Validate payment_id
            const payment = await Payment.findOne({
                where: {id: payment_id},
                include: [
                    {
                        model: Booking
                    }
                ]
            });
            if (!payment) {
                throw new BadRequestException('Incorrect payment id!')
            }

            const drink = await Drink.findByPk(body.drink_id);
            if (!drink) {
                throw new BadRequestException('Incorrect payment id!')
            }

            if ( body.qty ) {
                throw new BadRequestException('Quantity must be bigger than 0!')
            }

            body.total_price = Math.round((drink.price * body.qty) * 100) / 100; 

            const drink_payment = await DrinksPayment.create(
                {
                    drink_id: body.drink_id,
                    qty: body.qty,
                    total_price: body.total_price,
                    payment_id: payment.id,
                    booking_id: payment.booking_id
                },
                {
                    returning: true,
                    transaction
                }
            )

            if(drink_payment) {
                throw new BadRequestException("Can't create drink payment")
            }

            const price_drinks = await DrinksPayment.findAll({
                where: { payment_id }
            });

            // Sum up all the prices
            payment.total_price = price_drinks.reduce((sum, drink) => sum + drink.total_price, 0) + payment.booking.price;
            
            payment.save({transaction});

            await transaction.commit();

            return {
                data: {
                    drink_payment,
                    payment
                }
            };

        } catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

    async updateDrinkPayment( id: number, body: CreateUpdateDrinkPaymentDTO ) { 
        const sequelize = new Sequelize(sequelizeConfig);
        let transaction: Transaction;
        try {
            // Start the transaction
            transaction = await sequelize.transaction();

            const drinkPayment = await DrinksPayment.findOne({
                include: [
                    {
                        model: Payment,
                        include: [
                            {
                                model: Booking
                            }
                        ]
                    }
                ]
            });
            if (!drinkPayment) {
                throw new BadRequestException('Incorrect drink payment!')
            }

            const drink = await Drink.findByPk(body.drink_id);
            if (!drink) {
                throw new BadRequestException('Incorrect payment id!')
            }

            if ( body.qty ) {
                throw new BadRequestException('Quantity must be bigger than 0!')
            }

            body.total_price = Math.round((drink.price * body.qty) * 100) / 100; 

            const drink_payment = await DrinksPayment.update(
                {
                    drink_id: body.drink_id,
                    qty: body.qty,
                    total_price: body.total_price,
                },
                {
                    where: {id},
                    transaction
                }
            )

            if(drink_payment) {
                throw new BadRequestException("Can't update drink payment")
            }

            const price_drinks = await DrinksPayment.findAll({
                where: { id }
            });

            // Sum up all the prices
            const total_price = price_drinks.reduce((sum, drink) => sum + drink.total_price, 0) + drinkPayment.payment.booking.price;
            
            const payment = await Payment.update(
                {
                    total_price
                },
                {
                    where: {id: drinkPayment.payment_id},
                    transaction
                }
            )

            await transaction.commit();

            const new_drink_payment = await DrinksPayment.findOne({
                where: {id},
                include: [
                    {
                        model: Payment
                    }
                ]
            })
            
            return {
                data: {
                    drink_payment: new_drink_payment
                }
            };

        } catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

    async deleteDrinkPayment( id: number ) { 
        const sequelize = new Sequelize(sequelizeConfig);
        let transaction: Transaction;
        try {
            // Start the transaction
            transaction = await sequelize.transaction();

            const drinkPayment = await DrinksPayment.findOne({
                include: [
                    {
                        model: Payment,
                        include: [
                            {
                                model: Booking
                            }
                        ]
                    }
                ]
            });
            if (!drinkPayment) {
                throw new BadRequestException('Incorrect drink payment!')
            }

            const price_drinks = await DrinksPayment.findAll({
                where: { id: { [Op.not]: id } }
            });

            // Sum up all the prices
            const total_price = price_drinks.reduce((sum, drink) => sum + drink.total_price, 0) + drinkPayment.payment.booking.price;
            
            const payment = await Payment.update(
                {
                    total_price
                },
                {
                    where: {id: drinkPayment.payment_id},
                    transaction
                }
            )

            const destroy = await DrinksPayment.destroy({
                where: {id},
                transaction
            })

            await transaction.commit();

            const new_payment = await Payment.findOne({
                where: {id: drinkPayment.payment_id},
            })
            
            return {
                data: {
                    payment: new_payment
                }
            };

        } catch (error) {
            await transaction.rollback();
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

}
