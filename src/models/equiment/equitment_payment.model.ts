// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Equipment from './equitments.model';
import User from '../user/user.model';
import Payment from '../payment/payment.model';

// ================================================================>> Custom Library


@Table({ tableName: 'equipments_payment', createdAt: 'created_at', updatedAt: 'updated_at' })
class EquipmentPayment extends Model<EquipmentPayment> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    // Foreign Key for User model
    @ForeignKey(() => User)
    @Column({ allowNull: false, type: DataType.INTEGER })
    user_id: number;

    // Foreign Key for Equipment model
    @ForeignKey(() => Equipment)
    @Column({ allowNull: false, type: DataType.INTEGER })
    equipments_id: number;

    @Column({ allowNull: false, type: DataType.INTEGER })
    qty: number;

    // Foreign Key for Payment model
    @ForeignKey(() => Payment)
    @Column({ allowNull: false, type: DataType.INTEGER })
    payment_id: number;

    @Column({ allowNull: false, type: DataType.DOUBLE })
    total_price: number;

    @Column({ allowNull: false, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    updated_at: Date;

    // Associations (BelongsTo)
    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Equipment)
    equipment: Equipment;

    @BelongsTo(() => Payment)
    payment: Payment;
}

export default EquipmentPayment;
