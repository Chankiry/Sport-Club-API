// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey } from 'sequelize-typescript';

// ================================================================>> Costom Library

@Table({ tableName: 'dates_type', createdAt: 'created_at', updatedAt: 'updated_at' })
class DatesType extends Model<DatesType> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(100) })
    day: string;

    @Column({ allowNull: true, type: DataType.DOUBLE, defaultValue: 0 })
    price_multiplier: number;

}

export default DatesType;