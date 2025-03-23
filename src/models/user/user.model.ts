// ================================================================>> Third Party Library
import { Model, Column, Table, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';

// ================================================================>> Costom Library
import UsersRole            from './role.model';
import { UsersActiveEnum }  from '../../app/enums/user/active.enum';
import * as bcrypt from 'bcryptjs';

@Table({ tableName: 'user', createdAt: 'created_at', updatedAt: 'updated_at' })
class User extends Model<User> {
    /** @noted id is auto create by sequelize, so we can delete it from here it you want. */
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => UsersRole)
    @Column({ onDelete: 'CASCADE' })
    role_id: number;

    @Column({ allowNull: false, type: DataType.STRING(100) })
    name: string;

    @Column({ allowNull: true, type: DataType.STRING(100) })
    avatar: string;

    @Column({ allowNull: false, type: DataType.STRING(100) })
    phone: string;

    @Column({ allowNull: true, type: DataType.STRING(100), defaultValue: null })
    phone2: string;

    @Column({ allowNull: false, type: DataType.STRING(100) })
    email: string;

    @Column({ allowNull: false, type: DataType.STRING(100), set(value: string) 
        {const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        },
    })                                                                                              password: string;

    @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: UsersActiveEnum.Active })
    is_active: UsersActiveEnum;

    @BelongsTo(() => UsersRole)
    role: UsersRole;
}

export default User;