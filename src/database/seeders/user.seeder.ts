
import { UsersActiveEnum }  from "../../app/enums/user/active.enum";
import { UsersRoleEnum }    from "../../app/enums/user/type.enum";
import UsersRole            from "../../models/user/role.model";
import User                 from "../../models/user/user.model";


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
            avatar      : 'static/ecommerce/user/avatar.png',
            email       : 'kiry.kh@gmail.com',
            phone       : '012345678',
            password    : '123456',
            is_active   : UsersActiveEnum.Active
        },
        {
            role_id     : UsersRoleEnum.User,
            name        : 'Satya',
            avatar      : 'static/ecommerce/user/avatar.png',
            email       : 'satya@gmail.com',
            phone       : '012121212',
            password    : '123456',
            is_active   : UsersActiveEnum.Active
        }
    ]
}