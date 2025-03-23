// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey } from 'sequelize-typescript';
import PitchesCategory from './pitches_category.model';

// ================================================================>> Costom Library

@Table({ tableName: 'pitches', createdAt: 'created_at', updatedAt: 'updated_at' })
class Pitches extends Model<Pitches> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => PitchesCategory)
    @Column({ onDelete: 'CASCADE' })
    category_id: number;

    @Column({ allowNull: false, type: DataType.STRING(100) })
    name: string;

}

export default Pitches;