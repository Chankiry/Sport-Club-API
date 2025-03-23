// ================================================================>> Core Library
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// ================================================================>> Third Party Library
import * as jwt from 'jsonwebtoken';

// ================================================================>> Custom Library
import { jwtConstants } from "src/app/shared/constants.jwt";
import UserPayload from 'src/app/shared/user.payload';
import User from 'src/models/user/user.model';
import UsersRole from 'src/models/user/role.model';

/**
 * @author Kiry <yimklok.kh@gmail.com>
 * @returns user
 */
const UserDecorator = createParamDecorator(async (_data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token: string = request.headers?.authorization?.split('Bearer ')[1];
    const payload = jwt.verify(token, jwtConstants.secret) as UserPayload;
    if (payload && payload.user) {
        return await User.findByPk(payload.user.id, {
            attributes: ['id', 'name', 'avatar', 'phone', 'email', 'password'],
            include: [
                {
                    model: UsersRole,
                    attributes: ['id', 'name']
                }
            ]
        });
    }
    return null;
})
export default UserDecorator;