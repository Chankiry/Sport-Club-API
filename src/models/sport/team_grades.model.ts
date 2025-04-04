// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey } from 'sequelize-typescript';

// ================================================================>> Costom Library
import Sports from './sports.model';
@Table({ tableName: 'teams_grade', createdAt: 'created_at', updatedAt: 'updated_at' })

class TeamsGrade extends Model<TeamsGrade> {
    @Column({ allowNull: false, type: DataType.STRING(255) })
    name: string;

    @ForeignKey(() => Sports)  // Assuming 'Sport' model exists
    @Column({ allowNull: false, type: DataType.INTEGER })
    sport_id: number;

    @Column({ allowNull: false, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    updated_at: Date;
}

export default TeamsGrade;
