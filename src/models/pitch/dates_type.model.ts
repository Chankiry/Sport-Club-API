// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import DaysModel from './days.model';

// ================================================================>> Costom Library

@Table({ tableName: 'dates_type', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class DatesType extends Model<DatesType> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(100) })
    name: string;

    @ForeignKey(() => DaysModel)
    @Column({ onDelete: 'CASCADE' })
    from_day_id: number;

    @ForeignKey(() => DaysModel)
    @Column({ onDelete: 'CASCADE' })
    to_day_id: number;

    @Column({ allowNull: true, type: DataType.DOUBLE, defaultValue: 0 })
    price_multiplier: number;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;

    // relation
    @BelongsTo(() => DaysModel, { foreignKey: 'from_day_id', as: 'from_day' })                   
    from_day: DaysModel;

    @BelongsTo(() => DaysModel, { foreignKey: 'to_day_id', as: 'to_day' })                   
    to_day: DaysModel;

}

export default DatesType;