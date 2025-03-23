// ================================================================>> Core Library
import { SetMetadata } from "@nestjs/common";

export enum UserRoleDecorator {
    ADMIN = 'Admin',
    STAFF = 'User'
}

/**
 * @author Kiry <yimklok.kh@gmail.com>
 * @params Array<role>
 */
export const RolesDecorator = (...roles: UserRoleDecorator[]) => SetMetadata('roles', roles)