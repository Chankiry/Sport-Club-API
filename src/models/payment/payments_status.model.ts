// ================================================================>> Third Party Library
import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'payments_status', createdAt: 'created_at', updatedAt: 'updated_at' })
class PaymentStatus extends Model<PaymentStatus> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    name: string;

    @Column({ allowNull: true, type: DataType.STRING(50) })
    color: string;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;
}

export default PaymentStatus;
