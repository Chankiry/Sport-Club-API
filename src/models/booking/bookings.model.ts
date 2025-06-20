// ================================================================>> Third Party Library
import { Model, Column, Table, ForeignKey, BelongsTo, HasOne, DataType } from 'sequelize-typescript';

// ================================================================>> Custom Library
import User from '../user/user.model'; 
import Pitches from '../pitch/pitches.model';
import DatesType from '../pitch/dates_type.model';
import TimesType from '../pitch/times_type.model';
import BookingStatus from './booking_status.model';
import Payment from '../payment/payment.model';
 

@Table({ tableName: 'bookings', createdAt: 'created_at', updatedAt: 'updated_at' })
class Booking extends Model<Booking> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    name: string;

    @Column({ allowNull: true, type: DataType.STRING(15) })
    phone1: string;

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

    @Column({ allowNull: true, type: DataType.TIME })
    time: string;

    // Foreign Key for TimeType model
    @ForeignKey(() => TimesType)
    @Column({ allowNull: true, type: DataType.INTEGER })
    time_type_id: number;

    @Column({ allowNull: true, type: DataType.INTEGER })
    duration: number;

    @Column({ allowNull: true, type: DataType.BOOLEAN })
    needed_match: boolean;

    // Foreign Key for BookingStatus model
    @ForeignKey(() => BookingStatus)
    @Column({ allowNull: true, type: DataType.INTEGER })
    booking_status_id: number;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    price: string;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;

    // Associations (BelongsTo)
    @BelongsTo(() => Pitches)
    pitch: Pitches;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => DatesType)
    date_type: DatesType;

    @BelongsTo(() => TimesType)
    time_type: TimesType;

    @BelongsTo(() => BookingStatus)
    booking_status: BookingStatus;

    // 1 to 0..1 relationship with Payment
    @HasOne(() => Payment)
    payment: Payment;
}

export default Booking;