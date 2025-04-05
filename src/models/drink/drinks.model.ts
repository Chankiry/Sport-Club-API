// ================================================================>> Third Party Library
import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'drinks', createdAt: 'created_at', updatedAt: 'updated_at' })
class Drink extends Model<Drink> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    image: string;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    name: string;

    @Column({ allowNull: false, type: DataType.DOUBLE })
    price: number;

    @Column({ allowNull: false, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    updated_at: Date;
}

export default Drink;
