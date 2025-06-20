// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Booking from '../booking/bookings.model';
import SponsorPitch from '../sponsor/sponsors_sports.model';
import Drink from './drinks.model';
import Payment from '../payment/payment.model';

// ================================================================>> Custom Library


@Table({ tableName: 'drinks_payments', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class DrinksPayment extends Model<DrinksPayment> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    // Foreign Key for Drink model
    @ForeignKey(() => Drink)
    @Column({ allowNull: true, type: DataType.INTEGER })
    drink_id: number;

    // Foreign Key for Booking model
    @ForeignKey(() => Booking)
    @Column({ allowNull: true, type: DataType.INTEGER })
    booking_id: number;

    // Foreign Key for Payment model
    @ForeignKey(() => Payment)
    @Column({ allowNull: true, type: DataType.INTEGER })
    payment_id: number;

    // Foreign Key for SponsorPitch model
    @ForeignKey(() => SponsorPitch)
    @Column({ allowNull: true, type: DataType.INTEGER })
    sponsor_pitch_id: number;

    @Column({ allowNull: true, type: DataType.INTEGER })
    qty: number;

    @Column({ allowNull: true, type: DataType.DOUBLE })
    total_price: number;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;

    // Associations (BelongsTo)
    @BelongsTo(() => Drink)
    drink: Drink;

    @BelongsTo(() => Booking)
    booking: Booking;

    @BelongsTo(() => Payment)
    payment: Payment;

    @BelongsTo(() => SponsorPitch)
    sponsor_pitch: SponsorPitch;

}

export default DrinksPayment;
