// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, HasMany } from 'sequelize-typescript';
import Payment from './payment.model';

@Table({ tableName: 'payments_type', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class PaymentType extends Model<PaymentType> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    name: string;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;
    
    @HasMany(() => Payment)
    payments: Payment[];
}

export default PaymentType;
