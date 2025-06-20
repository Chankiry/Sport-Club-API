// ================================================================>> Third Party Library
import { Model, Column, Table, HasMany, DataType } from 'sequelize-typescript';

// ================================================================>> Costom Library
import User     from './user.model';

@Table({ tableName: 'users_role', createdAt: 'created_at', updatedAt: 'updated_at', timestamps: true })
class UsersRole extends Model<UsersRole> {
    @Column({ allowNull: true, type: DataType.STRING(100) })
    name: string;

    @HasMany(() => User)
    users: User[];
}

export default UsersRole;