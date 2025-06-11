// ================================================================>> Third Party Library
import { Model, Column, Table, DataType } from 'sequelize-typescript';

// ================================================================>> Costom Library

@Table({ tableName: 'sports', createdAt: 'created_at', updatedAt: 'updated_at' })
class Sports extends Model<Sports> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(100) })
    image: string;

    @Column({ allowNull: false, type: DataType.STRING(100) })
    name: string;

    @Column({ allowNull: true, type: DataType.STRING(500) })
    description: string;

    @Column({ allowNull: false, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    updated_at: Date;

}

export default Sports;