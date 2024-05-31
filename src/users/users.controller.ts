import { Controller, Delete, Req, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { TokenGuard } from 'src/interceptors/token-guard.interceptor';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseInterceptors(TokenGuard)
    @Delete()
    async delete(@Req() req: RequestWithAuthId) {
        await this.usersService.delete({
            where: {
                id: req.authId,
            },
        });
        return {
            message: 'User deleted successfully',
            data: null,
        }
    }
}
