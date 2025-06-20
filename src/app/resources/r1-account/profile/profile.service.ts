// ================================================================>> Core Library
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

// ================================================================>> Third Party Library
import { DatabaseError, Op } from 'sequelize';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

// ================================================================>> Costom Library
import { UpdatePasswordDto, UpdateProfileDto } from './profile.dto';
import User from 'src/models/user/user.model';
import { jwtConstants } from 'src/app/shared/constants.jwt';
import UsersRole from 'src/models/user/role.model';
import { FileService } from 'src/app/services/file.service';

@Injectable()
export class ProfileService {

    constructor(private readonly fileService: FileService) { };

    async update(body: UpdateProfileDto, userId: number): Promise<{ data: { access_token: string, user: any }, message: string }> {
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

        const token: string = this.generateToken(updateUser.id, updateUser.name, updateUser.email, updateUser.avatar, updateUser.phone, updateUser.role.name);
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

        const isPasswordValid = await bcrypt.compare(body.current_password, currentUser.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid current password', 'Password Error');
        }

        if (body.current_password === body.new_password) {
            throw new BadRequestException('New password should not the same current password');
        }

        const passwordHash = await bcrypt.hash(body.new_password, 12);
        body.new_password = passwordHash;

        //=============================================
        try {
            await User.update({
                password: body.new_password
            }, {
                where: { id: userId }
            });
        } catch (error) {
            throw new BadRequestException('Someting went wrong!. Please try again later.', 'Error Update');
        }

        //=============================================
        return { message: 'Password has been updated successfully.' };
    }

    private generateToken(id: number, name: string, email: string, avatar: string, phone: string, role: string): string {
        return jwt.sign(
            {
                user: {
                    id: id,
                    name: name,
                    email: email,
                    phone: phone,
                    avatar: avatar,
                },
                role: role
            }, jwtConstants.secret,
            {
                expiresIn: jwtConstants.expiresIn
            }
        );
    }
}