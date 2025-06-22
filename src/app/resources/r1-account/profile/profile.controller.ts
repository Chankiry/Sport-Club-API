// ================================================================>> Core Library
import { Controller, Body, Put, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';

// ================================================================>> Costom Library
import UserDecorator from 'src/app/decorators/user.decorator';

//Custom Services and DTOs:
import { ProfileService } from './profile.service';
import { UpdatePasswordDto, UpdateUserDto } from './profile.dto';

// File Handling:
import { FileService } from 'src/app/services/file.service';
import User from 'src/models/user/user.model';
import { UserDto } from '../auth/auth.dto';

@Controller()
export class ProfileController {
    constructor(
        private profileService: ProfileService,
        private fileService: FileService
    ) { };

    @Put('')
    async update(@Body() body: UpdateUserDto, @UserDecorator() user: User): Promise<{ data: { access_token: string, user: any }, message: string }> {
        return await this.profileService.update(body, user.id);
    }
   
    @Put('/update-password')
    async updatePassword(@UserDecorator() auth: User, @Body() body: UpdatePasswordDto): Promise<{ message: string }> {
        return await this.profileService.updatePassword(auth.id, body);
    }


}