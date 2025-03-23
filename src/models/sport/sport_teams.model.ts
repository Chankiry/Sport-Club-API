// ================================================================>> Third Party Library
import { Model, Column, Table, DataType } from 'sequelize-typescript';

// ================================================================>> Costom Library

@Table({ tableName: 'sport_teams', createdAt: 'created_at', updatedAt: 'updated_at' })
class SportTeams extends Model<SportTeams> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: false, type: DataType.STRING(100) })
    name: string;

}

export default SportTeams;