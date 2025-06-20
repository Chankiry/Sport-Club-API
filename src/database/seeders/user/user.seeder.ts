
import { UsersActiveEnum }  from "../../../app/enums/user/active.enum";
import { UsersRoleEnum }    from "../../../app/enums/user/type.enum";
import UsersRole            from "../../../models/user/role.model";
import User                 from "../../../models/user/user.model";


export class UserSeeder {

    seed = async () => {

        try {
            await UsersRole.bulkCreate(userSeeder.types);
            console.log('\x1b[32m\nSeed users_type inserted successfully.');
        } catch (error) {
            console.error('Error seeding orders:', error);
        }
        try {
            await User.bulkCreate(userSeeder.users);
            console.log('\x1b[32mSeed user inserted successfully.');
        } catch (error) {
            console.error('Error seeding orders:', error);
        }
    }
}

// Mock-data
const userSeeder = {
    types: [
        { name: 'Admin' },
        { name: 'User' }
    ],
    users: [
        {
            role_id     : UsersRoleEnum.Admin,
            name        : 'Kiry',
            avatar      : 'static/sport-club/user/avatar.png',
            email       : 'kiry.kh@gmail.com',
            phone       : '012345678',
            password    : '123456',
            is_active   : UsersActiveEnum.Active
        },
        {
            role_id     : UsersRoleEnum.User,
            name        : 'Satya',
            avatar      : 'static/sport-club/user/avatar.png',
            email       : 'satya@gmail.com',
            phone       : '012121212',
            password    : '123456',
            is_active   : UsersActiveEnum.Active
        },
        {
            role_id     : UsersRoleEnum.User,
            name        : 'Bopha',
            avatar      : 'static/sport-club/user/avatar.png',
            email       : 'bopha@gmail.com',
            phone       : '084894923',
            password    : '123456',
            is_active   : UsersActiveEnum.Active

        },
        {
            role_id     : UsersRoleEnum.User,
            name        : 'Theary',
            avatar      : 'static/sport-club/user/avatar.png',
            email       : 'theary@gmail.com',
            phone       : '0966538869',
            password    : '123456',
            is_active   : UsersActiveEnum.Active

        },
         {
            role_id     : UsersRoleEnum.User,
            name        : 'Chamraoen',
            avatar      : 'static/sport-club/user/avatar.png',
            email       : 'chamraoen@gmail.com',
            phone       : '098254867',
            password    : '123456',
            is_active   : UsersActiveEnum.Active
        },

    ]
}