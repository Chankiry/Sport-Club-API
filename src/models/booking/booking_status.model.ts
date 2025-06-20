// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, HasMany } from 'sequelize-typescript';
import Booking from './bookings.model';

@Table({ tableName: 'bookings_status', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class BookingStatus extends Model<BookingStatus> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    name: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    icon: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    color: string;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;

     // Association - One BookingStatus can have many Bookings
    @HasMany(() => Booking)
    bookings: Booking[];
}

export default BookingStatus;
