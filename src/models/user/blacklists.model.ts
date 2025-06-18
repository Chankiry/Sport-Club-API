// ================================================================>> Third Party Library
import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

// ================================================================>> Custom Library
import User from './user.model';  // Assuming you have a 'User' model

@Table({ tableName: 'blacklists', createdAt: 'created_at', updatedAt: 'updated_at' })
class Blacklist extends Model<Blacklist> {

    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    name: string;

    @Column({ allowNull: true, type: DataType.STRING(15) })
    phone1: string;

    @Column({ allowNull: true, type: DataType.STRING(15) })
    phone2: string;

    @Column({ allowNull: true, type: DataType.STRING(255) })
    reason: string;

    // Foreign Key for User model
    @ForeignKey(() => User)
    @Column({ allowNull: true, type: DataType.INTEGER })
    user_id: number;

    @Column({ allowNull: true, type: DataType.DATE })
    created_at: Date;

    @Column({ allowNull: true, type: DataType.DATE })
    updated_at: Date;

    // Associations (BelongsTo)
    @BelongsTo(() => User)
    user: User;
}

export default Blacklist;
