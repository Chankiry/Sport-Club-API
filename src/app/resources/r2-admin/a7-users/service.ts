// ===========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize, Transaction }       from 'sequelize';
import * as moment  from 'moment';
import User from 'src/models/user/user.model';
import { CreateUserDTO } from './dto';
import UsersRole from 'src/models/user/role.model';
import sequelizeConfig from 'src/config/sequelize.config';
import { FileService } from 'src/app/services/file.service';
import { UsersActiveEnum } from 'src/app/enums/user/active.enum';


// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class AdminUserService {

    // File Service for upload image
    constructor(
        private fileService: FileService
    ) { };

    private isValidBase64(str: string): boolean {
        const base64Pattern = /^data:image\/(jpeg|png|gif|bmp|webp);base64,[a-zA-Z0-9+/]+={0,2}$/;
        return base64Pattern.test(str);
    }

    private startOfDay = (date: Date): Date => {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0); // Set time to 00:00:00.000
        return start;
    };
    
    private endOfDay = (date: Date): Date => {
        const end = new Date(date);
        end.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
        return end;
    };

    // ==================================================================>> Get data User with filtering
    async getData(filters?: {
        key?: string;
        role_id?: number;
        is_active?: number;
        page?: number;
        limit?: number;
    }) { 
        try {
            const page = filters?.page || 1;
            const limit = filters?.limit || 10;
            const offset = (page - 1) * limit;

            const start_month = new Date(moment().startOf('month').format('YYYY-MM-DD'))
            const end_month = new Date(moment().endOf('month').format('YYYY-MM-DD'))

            const start_date = this.startOfDay(start_month);
            const end_date = this.endOfDay(end_month)

            // Build where conditions
            const whereConditions: any = {
                ...(filters.key && {
                    [Op.or]: [
                        { name: { [Op.like]: `%${filters.key}%` } },
                        { email: { [Op.like]: `%${filters.key}%` } },
                        { phone: { [Op.like]: `%${filters.key}%` } },
                        { phone2: { [Op.like]: `%${filters.key}%` } }
                    ]
                }),
                ...((filters.is_active || filters.is_active === 0) && { is_active : filters.is_active }),
                ...(filters.role_id && { role_id : filters.role_id }),
            };
            
            const { count, rows: users } = await User.findAndCountAll({
                where: whereConditions,
                attributes: ['id', 'name', 'phone', 'phone2', 'email', 'avatar', 'phone2', 'last_login_at', 'is_active', 'role_id', 'created_at'],
                include: [
                    {
                        model: UsersRole,
                        attributes: ['id', 'name'],
                    }
                ],
                limit,
                offset,
                order: [['created_at', 'DESC']]
            });

            const total_users = await User.count();
            const total_news_users_this_month = await User.count({
                where: {
                    created_at: {
                    [Op.between]: [start_date, end_date] // Filter by date range
                    }
                }
            })

            const total_inactive_users = await User.count({
                where: {
                    is_active: UsersActiveEnum.Unactive
                }
            })

            return {
                data: {
                    total_users,
                    total_news_users_this_month,
                    total_inactive_users,
                    users
                },
                pagination: {
                    total: count,
                    page,
                    limit,
                    totalPages: Math.ceil(count / limit)
                }
            };

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message);
        }
    }

    async dataSetup() { 
        try {
            
            const roles = await UsersRole.findAll({
                attributes: ['id', 'name']
            })

            return {
                data:{
                    roles
                }
            };

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message);
        }
    }

    async create( body: CreateUserDTO ) { 
        const sequelize = new Sequelize(sequelizeConfig);
        let transaction: Transaction;
        try {
            // Start the transaction
            transaction = await sequelize.transaction();
            
            const role = await UsersRole.findByPk(body.role_id);
            
            if(!role){
                await transaction.rollback();
                throw new BadRequestException('Incorrect role!')
            }

            if (body?.avatar && body?.avatar !== "" && body.avatar !== null) {
                if (this.isValidBase64(body.avatar)) {
                    const result = await this.fileService.uploadBase64Image('avatar', body.avatar);
                    if (result.error) {
                        throw new BadRequestException(result.error);
                    }
                    // Replace base64 string with file URI from FileService
                    body.avatar = result.file?.uri;
                } else {
                    await transaction.rollback();
                    throw new BadRequestException('រូបភាពត្រួវតែជា base64');
                }
            }
            else{
                body.avatar = 'static/sport-club/user/avatar.png';
            }

            const newUser = await User.create(
                body,
                {
                    returning: true,
                    transaction
                }
            );

            if(!newUser){
                await transaction.rollback();
                throw new BadRequestException('Create user unsuccessfully!')
            }

            await transaction.commit();
            
            const result = await User.findOne({
                where: {id: newUser.id},
                include: [
                    {
                        model: UsersRole,
                        attributes: ['id', 'name']
                    }
                ]
            })

            return result;

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

    async update( id: number, body: CreateUserDTO ) { 
        const sequelize = new Sequelize(sequelizeConfig);
        let transaction: Transaction;
        try {
            // Start the transaction
            transaction = await sequelize.transaction();
            
            const user = await User.findByPk(id);
            
            if(!user){
                await transaction.rollback();
                throw new BadRequestException('Incorrect user!')
            }

            const role = await UsersRole.findByPk(body.role_id);
            
            if(!role){
                await transaction.rollback();
                throw new BadRequestException('Incorrect role!')
            }

            if (body?.avatar && body?.avatar !== "" && body.avatar !== null) {
                if (this.isValidBase64(body.avatar)) {
                    const result = await this.fileService.uploadBase64Image('avatar', body.avatar);
                    if (result.error) {
                        throw new BadRequestException(result.error);
                    }
                    // Replace base64 string with file URI from FileService
                    body.avatar = result.file?.uri;
                    console.log(result)
                } else {
                    await transaction.rollback();
                    throw new BadRequestException('រូបភាពត្រួវតែជា base64');
                }
            }
            else{
                body.avatar = user.avatar;
                console.log(body.avatar)
            }
            
            const newUser = await User.update(
                body,
                {
                    where: {id},
                    returning: true,
                    transaction
                }
            );

            if(!newUser[0]){
                await transaction.rollback();
                throw new BadRequestException('Update user unsuccessfully!')
            }

            await transaction.commit();
            
            const result = await User.findOne({
                where: {id},
                include: [
                    {
                        model: UsersRole,
                        attributes: ['id', 'name']
                    }
                ]
            })

            return result;

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

    async delete( id: number ) { 
        const sequelize = new Sequelize(sequelizeConfig);
        let transaction: Transaction;
        try {
            // Start the transaction
            transaction = await sequelize.transaction();
            
            const user = await User.findByPk(id);
            
            if(!user){
                await transaction.rollback();
                throw new BadRequestException('Incorrect user!')
            }

            const result = await User.destroy({
                where: {id},
                transaction
            })

            if(!result){
                await transaction.rollback();
                throw new BadRequestException('Delete user unsuccessfully!')
            }

            await transaction.commit();

            return {
                message: "Delete user successfully!"
            };

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
        }
    }

}
