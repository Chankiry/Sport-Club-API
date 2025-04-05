// ================================================================>> Third Party Library
import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'payments_type', createdAt: 'created_at', updatedAt: 'updated_at' })
class PaymentType extends Model<PaymentType> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    name: string;

    @Column({ allowNull: false, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    updated_at: Date;
}

export default PaymentType;
