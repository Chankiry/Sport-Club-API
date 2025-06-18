// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Sports from './sports.model';
import User from '../user/user.model';

// ================================================================>> Costom Library

@Table({ tableName: 'sport_ratings', createdAt: 'created_at', updatedAt: 'updated_at' })
class SportRating extends Model<SportRating> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    // Foreign Key for Sport model 
    @ForeignKey(() => Sports)
    @Column({ allowNull: true, type: DataType.INTEGER })
    sport_id: number;

    @ForeignKey(() => User)
    @Column({ allowNull: true, type: DataType.INTEGER })
    user_id: number;

    @Column({
        allowNull: true,
        type: DataType.INTEGER(),
        validate: {
            min: 1,
            max: 5,
        },
    })
    rating: number;

    @Column({ allowNull: true, type: DataType.STRING(500) })
    description: string;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;

    @BelongsTo(() => Sports)
    sport: Sports;
    avg_rating: string;
    
    @BelongsTo(() => User)
    user: User;

}

export default SportRating;