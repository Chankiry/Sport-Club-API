// ================================================================>> Third Party Library
import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'payments_method', createdAt: 'created_at', updatedAt: 'updated_at' })
class PaymentMethod extends Model<PaymentMethod> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    name: string;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;
}

export default PaymentMethod;
