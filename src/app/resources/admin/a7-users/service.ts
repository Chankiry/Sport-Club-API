// ===========================================================================>> Core Library
import { BadRequestException, Injectable } from '@nestjs/common';

// ===========================================================================>> Third Party Library
import { Op, Sequelize, Transaction }       from 'sequelize';
import * as moment  from 'moment';
import User from 'src/models/user/user.model';
import { CreateUserDTO } from './dto';
import UsersRole from 'src/models/user/role.model';
import sequelizeConfig from 'src/config/sequelize.config';


// ===========================================================================>> Custom Library

// ===>> Model


@Injectable()
export class AdminUserService {
    
    // ==================================================================>> Get data User
    async getData() { 
        try {
            
            const user = await User.findAll({
                attributes: ['id', 'name', 'phone', 'email', 'avatar', 'phone2'],
                include: [
                    {
                        model: UsersRole,
                        attributes: ['id', 'name']
                    }
                ]
            });
            
            return user;

        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message); // Handle errors gracefully
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

}
