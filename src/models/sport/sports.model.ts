// ================================================================>> Third Party Library
import { Model, Column, Table, DataType } from 'sequelize-typescript';

// ================================================================>> Costom Library

@Table({ tableName: 'sports', createdAt: 'created_at', updatedAt: 'updated_at' })
class Sports extends Model<Sports> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: false, type: DataType.STRING(100) })
    name: string;

}

export default Sports;