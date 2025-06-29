// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, HasMany } from 'sequelize-typescript';
import DrinksPayment from './drink_payments.model';

@Table({ tableName: 'drinks', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class Drink extends Model<Drink> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    image: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    name: string;

    @Column({ allowNull: true, type: DataType.DOUBLE })
    price: number;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;

    @HasMany(() => DrinksPayment)
    payments: DrinksPayment[];
}

export default Drink;
