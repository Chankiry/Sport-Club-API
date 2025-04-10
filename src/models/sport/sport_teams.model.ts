// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Sports from './sports.model';
import TeamsGrade from './team_grades.model';
import User from '../user/user.model';


// ================================================================>> Custom Library


@Table({ tableName: 'sport_teams', createdAt: 'created_at', updatedAt: 'updated_at' })
class SportTeams extends Model<SportTeams> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    logo: string;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    name: string;

    // Foreign Key for Sport model
    @ForeignKey(() => Sports)
    @Column({ allowNull: false, type: DataType.INTEGER })
    sport_id: number;

    // Foreign Key for TeamsGrade model
    @ForeignKey(() => TeamsGrade)
    @Column({ allowNull: false, type: DataType.INTEGER })
    grade_id: number;

    // Foreign Key for User model
    @ForeignKey(() => User)
    @Column({ allowNull: false, type: DataType.INTEGER })
    user_id: number;

    @Column({ allowNull: true, type: DataType.STRING(15) })
    phone1: string;

    @Column({ allowNull: true, type: DataType.STRING(15) })
    phone2: string;

    @Column({ allowNull: false, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    updated_at: Date;

    // Associations (BelongsTo)
    @BelongsTo(() => Sports)
    sport: Sports;

    @BelongsTo(() => TeamsGrade)
    grade: TeamsGrade;

    @BelongsTo(() => User)
    user: User;
}

export default SportTeams;
