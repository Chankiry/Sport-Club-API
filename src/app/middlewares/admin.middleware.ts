import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const role = res.locals.role as string;

        if (role !== 'Admin') {
            throw new ForbiddenException('Access denied. Not allowed to access to route.');
        }

        if (!role) {
            throw new UnauthorizedException('Unauthorized');
        }
        
        next();
    }
}
