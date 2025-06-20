// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey } from 'sequelize-typescript';

// ================================================================>> Costom Library

@Table({ tableName: 'times_type', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class TimesType extends Model<TimesType> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(100) })
    from_time: string;

    @Column({ allowNull: true, type: DataType.STRING(100) })
    to_time: string;

    @Column({ allowNull: true, type: DataType.DOUBLE, defaultValue: 0 })
    price_multiplier: number;

}

export default TimesType;