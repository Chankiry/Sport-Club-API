// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Sports from '../sport/sports.model';
import Sponsor from './sponsors.model';
import Drink from '../drink/drinks.model';
import DrinksPayment from '../drink/drink_payments.model';
// ================================================================>> Custom Library


@Table({ tableName: 'sponsors_sports', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class SponsorPitch extends Model<SponsorPitch> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    // Foreign Key for Sponsor model
    @ForeignKey(() => Sponsor)
    @Column({ allowNull: true, type: DataType.INTEGER })
    sponsor_id: number;

    // Foreign Key for Sport model
    @ForeignKey(() => Sports)
    @Column({ allowNull: true, type: DataType.INTEGER })
    sport_id: number;

    // Foreign Key for Drink model
    @ForeignKey(() => Drink)
    @Column({ allowNull: true, type: DataType.INTEGER })
    drink_id: number;

    @Column({ allowNull: true, type: DataType.INTEGER })
    drinks_qty: number;

    @Column({ allowNull: true, type: DataType.BOOLEAN })
    is_sponsored: boolean;

    // Foreign Key for Payment model
    @ForeignKey(() => DrinksPayment)
    @Column({ allowNull: true, type: DataType.INTEGER })
    drink_payment_id: number;

    @Column({ allowNull: true, type: DataType.DATE })
    expired_date: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;

    // Associations (BelongsTo)
    @BelongsTo(() => Sponsor)
    sponsor: Sponsor;

    @BelongsTo(() => Sports)
    sport: Sports;

    @BelongsTo(() => Drink)
    drink: Drink;

    @BelongsTo(() => DrinksPayment)
    drinks_payment: DrinksPayment;
}

export default SponsorPitch;
