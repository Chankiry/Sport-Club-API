// ================================================================>> Third Party Library
import { Model, Column, Table, ForeignKey, BelongsTo, HasOne, DataType, HasMany } from 'sequelize-typescript';

// ================================================================>> Custom Library
import User from '../user/user.model'; 
import Pitches from '../pitch/pitches.model';
import DatesType from '../pitch/dates_type.model';
import TimesType from '../pitch/times_type.model';
import BookingStatus from './booking_status.model';
import Payment from '../payment/payment.model';
import TimesModel from '../pitch/times.model';
import DrinksPayment from '../drink/drink_payments.model';
 

@Table({ tableName: 'bookings', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class Booking extends Model<Booking> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(15) })
    phone: string;

    @Column({ allowNull: true, type: DataType.STRING(15) })
    phone2: string;

    // Foreign Key for Pitch model
    @ForeignKey(() => Pitches)
    @Column({ allowNull: true, type: DataType.INTEGER })
    pitch_id: number;

    // Foreign Key for User model
    @ForeignKey(() => User)
    @Column({ allowNull: true, type: DataType.INTEGER })
    user_id: number;

    @Column({ allowNull: true, type: DataType.DATE })
    date: Date;

    // Foreign Key for DateType model
    @ForeignKey(() => DatesType)
    @Column({ allowNull: true, type: DataType.INTEGER })
    date_type_id: number;

    // Foreign Key for BookingStatus model
    @ForeignKey(() => BookingStatus)
    @Column({ allowNull: true, type: DataType.INTEGER })
    booking_status_id: number;

    // Foreign Key for TimeType model
    @ForeignKey(() => TimesType)
    @Column({ allowNull: true, type: DataType.INTEGER })
    time_type_id: number;

    // Foreign Key for Pitch model
    @ForeignKey(() => TimesModel)
    @Column({ allowNull: true, type: DataType.INTEGER })
    time_id: number;

    @Column({ allowNull: true, type: DataType.INTEGER })
    duration_in_hours: number;

    @Column({ allowNull: true, type: DataType.BOOLEAN })
    needed_match: boolean;

    @Column({ allowNull: true, type: DataType.DOUBLE })
    price: number;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;

    // Associations (BelongsTo)
    @BelongsTo(() => Pitches)
    pitch: Pitches;

    @BelongsTo(() => TimesModel)
    time: TimesModel;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => DatesType)
    date_type: DatesType;

    @BelongsTo(() => TimesType)
    time_type: TimesType;

    @BelongsTo(() => BookingStatus)
    booking_status: BookingStatus;

    @HasMany(() => DrinksPayment)
    drinks_payments: DrinksPayment[];

    // 1 to 0..1 relationship with Payment
    @HasOne(() => Payment)
    payment: Payment;
}

export default Booking;