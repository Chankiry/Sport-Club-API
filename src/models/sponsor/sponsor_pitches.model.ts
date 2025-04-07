// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Sports from '../sport/sports.model';
import Sponsor from './sponsors.model';
import Drink from '../drink/drinks.model';
import Payment from '../payment/payment.model';

// ================================================================>> Custom Library


@Table({ tableName: 'sponsors_pitch', createdAt: 'created_at', updatedAt: 'updated_at' })
class SponsorPitch extends Model<SponsorPitch> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    // Foreign Key for Sponsor model
    @ForeignKey(() => Sponsor)
    @Column({ allowNull: false, type: DataType.INTEGER })
    sponsor_id: number;

    // Foreign Key for Sport model
    @ForeignKey(() => Sports)
    @Column({ allowNull: false, type: DataType.INTEGER })
    sport_id: number;

    // Foreign Key for Drink model
    @ForeignKey(() => Drink)
    @Column({ allowNull: false, type: DataType.INTEGER })
    drink_id: number;

    @Column({ allowNull: false, type: DataType.INTEGER })
    drinks_qty: number;

    @Column({ allowNull: false, type: DataType.BOOLEAN })
    is_sponsored: boolean;

    // Foreign Key for Payment model
    @ForeignKey(() => Payment)
    @Column({ allowNull: true, type: DataType.INTEGER })
    drink_payment_id: number;

    @Column({ allowNull: false, type: DataType.DATE })
    expired_date: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    updated_at: Date;

    // Associations (BelongsTo)
    @BelongsTo(() => Sponsor)
    sponsor: Sponsor;

    @BelongsTo(() => Sports)
    sport: Sports;

    @BelongsTo(() => Drink)
    drink: Drink;

    @BelongsTo(() => Payment)
    payment: Payment;
}

export default SponsorPitch;
