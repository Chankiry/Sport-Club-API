// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey } from 'sequelize-typescript';

// ================================================================>> Costom Library

@Table({ tableName: 'times_type', createdAt: 'created_at', updatedAt: 'updated_at' })
class TimesType extends Model<TimesType> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: false, type: DataType.STRING(100) })
    from_time: string;

    @Column({ allowNull: false, type: DataType.STRING(100) })
    to_time: string;

    @Column({ allowNull: false, type: DataType.DOUBLE, defaultValue: 0 })
    price: number;

}

export default TimesType;