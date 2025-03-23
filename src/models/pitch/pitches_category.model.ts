// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey } from 'sequelize-typescript';
import Sports from '../sport/sports.model';

// ================================================================>> Costom Library

@Table({ tableName: 'pitches_category', createdAt: 'created_at', updatedAt: 'updated_at' })
class PitchesCategory extends Model<PitchesCategory> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => Sports)
    @Column({ onDelete: 'CASCADE' })
    sport_id: number;

    @Column({ allowNull: false, type: DataType.STRING(100) })
    name: string;

    @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
    required_players: number;

    @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
    volume: number;

    @Column({ allowNull: false, type: DataType.DOUBLE, defaultValue: 0 })
    price: number;

}

export default PitchesCategory;