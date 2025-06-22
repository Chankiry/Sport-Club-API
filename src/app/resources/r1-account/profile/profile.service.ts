// ================================================================>> Core Library
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

// ================================================================>> Third Party Library
import { DatabaseError, Op } from 'sequelize';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

// ================================================================>> Costom Library
import { UpdatePasswordDto, UpdateUserDto } from './profile.dto';
import User from 'src/models/user/user.model';
import { jwtConstants } from 'src/app/shared/constants.jwt';
import UsersRole from 'src/models/user/role.model';
import { FileService } from 'src/app/services/file.service';
import { UserDto } from '../auth/auth.dto';

@Injectable()
export class ProfileService {

    constructor(private readonly fileService: FileService) { };

    async update(body: UpdateUserDto, userId: number): Promise<{ data: { access_token: string, user: any }, message: string }> {
        //=============================================
        let currentUser: User;
        try {
            currentUser = await User.findByPk(userId);
        } catch (error) {
            throw new BadRequestException('Someting went wrong!. Please try again later.', 'Error Query');
        }
        if (!currentUser) {
            throw new BadRequestException('Invalid user_id');
        }

        //=============================================
        let checkExistPhone: User;
        try {
            checkExistPhone = await User.findOne({
                where: {
                    id: { [Op.not]: userId },
                    phone: body.phone
                }
            });
        } catch (error) {
            throw new BadRequestException('Someting went wrong!. Please try again later.', 'Error Query');
        }
        if (checkExistPhone) {
            throw new ConflictException('Phone is already in use');
        }

        //=============================================
        let checkExistEmail: User;
        try {
            checkExistEmail = await User.findOne({
                where: {
                    id: { [Op.not]: userId },
                    email: body.email
                }
            });
        } catch (error) {
            throw new BadRequestException('Someting went wrong!. Please try again later.', 'Error Query');
        }
        if (checkExistEmail) {
            throw new ConflictException('Email is already in use');
        }

        if (body.avatar) {
            const result = await this.fileService.uploadBase64Image('profie', body.avatar);
            if (result.error) {
                throw new BadRequestException(result.error);
            }
            body.avatar = result.file.uri;
        } else {
            body.avatar = undefined;
        }

        //=============================================
        try {
            await User.update(body, {
                where: { id: userId }
            });
        } catch (error) {
            throw new BadRequestException('Someting went wrong!. Please try again later.', 'Error Update');
        }

        //=============================================
        let updateUser: User;
        try {
            updateUser = await User.findByPk(userId, {
                attributes: ['id', 'name', 'avatar', 'phone', 'email', 'password'],
                include: [
                    {
                        model: UsersRole,
                        attributes: ['id', 'name']
                    }
                ]
            });
        } catch (error) {
            /** @databaseError */
            if (error instanceof DatabaseError && error.message.includes('invalid identifier')) {
                throw new BadRequestException('Invalid input data or database error', 'Database Error');
            } else {
                throw new BadRequestException('Someting went wrong!. Please try again later.', 'Error Query');
            }
        }

        const user = await User.findOne({
            where: {id: updateUser.id},
            attributes: ['id', 'name', 'email','phone', 'avatar']
        });

        const token: string = this._generateToken(updateUser);
        return {
            data: {
                access_token: token,
                user: user
            },
            message: 'Your profile has been updated successfully.'
        }
    }
    async updatePassword(userId: number, body: UpdatePasswordDto): Promise<{ message: string }> {
        //=============================================
        let currentUser: User;
        try {
            currentUser = await User.findByPk(userId);
        } catch (error) {
            throw new BadRequestException('Someting went wrong!. Please try again later.', 'Error Query');
        }
        if (!currentUser) {
            throw new BadRequestException('Invalid user_id');
        }

        if (body.password !== body.confirm_password) {
            throw new BadRequestException('Passwords and Confirm password do not match');
        }
        //=============================================
        try {
            await User.update({
                password: body.confirm_password,
            }, {
                where: { id: userId }
            });
        } catch (error) {
            throw new BadRequestException('Someting went wrong!. Please try again later.', 'Error Update');
        }

        //=============================================
        return { message: 'Password has been updated successfully.' };
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