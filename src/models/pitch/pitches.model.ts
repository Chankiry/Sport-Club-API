// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import PitchesCategory from './pitches_category.model';

// ================================================================>> Costom Library

@Table({ tableName: 'pitches', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class Pitches extends Model<Pitches> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => PitchesCategory)
    @Column({ onDelete: 'CASCADE' })
    category_id: number;

    @Column({ allowNull: true, type: DataType.STRING(100) })
    name: string;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;

    // relation
    @BelongsTo(() => PitchesCategory)                   
    category: PitchesCategory;

}

export default Pitches;