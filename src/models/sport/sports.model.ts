// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import Pitches from '../pitch/pitches.model';
import PitchesCategory from '../pitch/pitches_category.model';

// ================================================================>> Costom Library

@Table({ tableName: 'sports', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class Sports extends Model<Sports> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(100) })
    image: string;

    @Column({ allowNull: true, type: DataType.STRING(100) })
    name: string;

    @Column({ allowNull: true, type: DataType.STRING(500) })
    description: string;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;

    @HasMany(() => PitchesCategory)
    pitches_categories: PitchesCategory[];

}

export default Sports;