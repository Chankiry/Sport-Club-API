// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Sports from '../sport/sports.model';

// ================================================================>> Costom Library

@Table({ tableName: 'pitches_category', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class PitchesCategory extends Model<PitchesCategory> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => Sports)
    @Column({ onDelete: 'CASCADE' })
    sport_id: number;

    @Column({ allowNull: true, type: DataType.STRING(100) })
    image: string;

    @Column({ allowNull: true, type: DataType.STRING(100) })
    name: string;

    @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: 0 })
    required_players: number;

    @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: 0 })
    volume: number;

    @Column({ allowNull: true, type: DataType.DOUBLE, defaultValue: 0 })
    price: number;

     // Associations (BelongsTo)
     @BelongsTo(() => Sports)
     sport: Sports;

}

export default PitchesCategory;