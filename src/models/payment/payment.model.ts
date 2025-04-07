// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Booking from '../booking/bookings.model';
import PaymentType from './payments_types.model';

// ================================================================>> Custom Library


@Table({ tableName: 'payments', createdAt: 'created_at', updatedAt: 'updated_at' })
class Payment extends Model<Payment> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    receipt_number: string;

    // Foreign Key for Booking model
    @ForeignKey(() => Booking)
    @Column({ allowNull: false, type: DataType.INTEGER })
    booking_id: number;

    // Foreign Key for PaymentType model
    @ForeignKey(() => PaymentType)
    @Column({ allowNull: false, type: DataType.INTEGER })
    type_id: number;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    is_paid: boolean;

    @Column({ allowNull: false, type: DataType.DOUBLE })
    total_price: number;

    @Column({ allowNull: false, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    updated_at: Date;

    // Associations (BelongsTo)
    @BelongsTo(() => Booking)
    booking: Booking;

    @BelongsTo(() => PaymentType)
    payment_type: PaymentType;
}

export default Payment;
