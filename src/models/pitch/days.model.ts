// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey } from 'sequelize-typescript';

// ================================================================>> Costom Library

@Table({ tableName: 'days', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class DaysModel extends Model<DaysModel> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(100) })
    name: string;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;

}

export default DaysModel;