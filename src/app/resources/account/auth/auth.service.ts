// ================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ================================================================>> Third Party Library
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { DatabaseError, Op, Sequelize, Transaction } from 'sequelize';

// ================================================================>> Costom Library
// Model
import User from '../../../../models/user/user.model';
import UsersRole from '../../../../models/user/role.model';

import { jwtConstants } from 'src/app/shared/constants.jwt';
import { UsersActiveEnum } from 'src/app/enums/user/active.enum';

import { SignUpDto, UserDto } from './auth.dto';
import sequelizeConfig from 'src/config/sequelize.config';
import { UsersRoleEnum } from 'src/app/enums/user/type.enum';

interface LoginPayload {
    username: string
    password: string
}

@Injectable()
export class AuthService {
    /** @userLogin */
    async login(body: LoginPayload): Promise<{  access_token: string, expires_in: string, role:string, user: UserDto }> {
        let user: User;
        try {
            user = await User.findOne({
                where: {
                    [Op.or]: [
                        { phone: body.username },
                        { email: body.username }
                    ],
                    is_active: UsersActiveEnum.Active
                },
                attributes: ['id', 'name', 'avatar', 'phone', 'email', 'password'],
                include: [
                    {
                        model: UsersRole,
                        attributes: ['id', 'name']
                    }
                ]
            });
        } catch (error) {
            console.error(error);
            if (error instanceof DatabaseError && error.message.includes('invalid identifier')) {
                throw new BadRequestException('Invalid input data or database error', 'Database Error');
            } else {
                throw new BadRequestException('Server database error', 'Database Error');
            }
        }
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(body.password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid password', 'Password Error');
        }

        const role: string = user.role.name ?? '';
        const token = this._generateToken(user);

        // ===>> Prepare Response
        return {
            access_token: token,
            expires_in: `${jwtConstants.expiresIn / 3600}h`,
            user: new UserDto(user),
            role: role
        }
    }

    private _generateToken(user: User): string {
        return jwt.sign(
            {
                user: new UserDto(user),
                role: user.role.name
            }, 
            jwtConstants.secret,
            {
                expiresIn: jwtConstants.expiresIn
            }
        );
    }

}
