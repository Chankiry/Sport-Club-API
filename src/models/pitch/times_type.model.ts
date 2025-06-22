// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import TimesModel from './times.model';

// ================================================================>> Costom Library

@Table({ tableName: 'times_type', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class TimesType extends Model<TimesType> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(100) })
    name: string;

    @ForeignKey(() => TimesModel)
    @Column({ onDelete: 'CASCADE' })
    from_time_id: number;

    @ForeignKey(() => TimesModel)
    @Column({ onDelete: 'CASCADE' })
    to_time_id: number;

    @Column({ allowNull: true, type: DataType.DOUBLE, defaultValue: 0 })
    price_multiplier: number;

    @Column({ allowNull: true, type: DataType.DOUBLE, defaultValue: 1 })
    duration_in_hours: number;
    
    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;

    // relation
    @BelongsTo(() => TimesModel, { foreignKey: 'from_time_id', as: 'from_time' })                   
    from_time: TimesModel;

    @BelongsTo(() => TimesModel, { foreignKey: 'to_time_id', as: 'to_time' })                   
    to_time: TimesModel;

}

export default TimesType;