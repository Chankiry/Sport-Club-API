// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Drink from '../drink/drinks.model';
import Sports from '../sport/sports.model';

// ================================================================>> Custom Library


@Table({ tableName: 'sponsors', createdAt: 'created_at', updatedAt: 'updated_at' })
class Sponsor extends Model<Sponsor> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    company_name: string;

    // Foreign Key for Sport model
    @ForeignKey(() => Sports)
    @Column({ allowNull: false, type: DataType.INTEGER })
    sport_id: number;

    // Foreign Key for Drink model
    @ForeignKey(() => Drink)
    @Column({ allowNull: false, type: DataType.INTEGER })
    drink_id: number;

    @Column({ allowNull: false, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    updated_at: Date;

    // Associations (BelongsTo)
    @BelongsTo(() => Sports)
    sport: Sports;

    @BelongsTo(() => Drink)
    drink: Drink;
}

export default Sponsor;
