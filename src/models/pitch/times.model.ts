// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey } from 'sequelize-typescript';

// ================================================================>> Costom Library

@Table({ tableName: 'times', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class TimesModel extends Model<TimesModel> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(100) })
    name: string;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;

}

export default TimesModel;