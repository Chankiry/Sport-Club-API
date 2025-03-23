// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey } from 'sequelize-typescript';

// ================================================================>> Costom Library

@Table({ tableName: 'dates_type', createdAt: 'created_at', updatedAt: 'updated_at' })
class DatesType extends Model<DatesType> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: false, type: DataType.STRING(100) })
    from_day: string;

    @Column({ allowNull: false, type: DataType.STRING(100) })
    to_day: string;

    @Column({ allowNull: false, type: DataType.DOUBLE, defaultValue: 0 })
    price: number;

}

export default DatesType;