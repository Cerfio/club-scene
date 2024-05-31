import { Body, Controller, Get, Put, Req, UseInterceptors } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { TokenGuard } from 'src/interceptors/token-guard.interceptor';
import { ProfileUpdateDtoInput } from './dto/profile-update.input.dto';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profilesService: ProfilesService) { }

  @UseInterceptors(TokenGuard)
  @Get()
  async get(@Req() req: RequestWithAuthId) {
    const user = await this.profilesService.get({
      where: {
        userId: req.authId,
      },
      select: {
        username: true,
        avatar: true,
        description: true,
      },
    });
    return {
      message: 'Profile fetched successfully',
      data: user,
    }
  }

  @UseInterceptors(TokenGuard)
  @Put()
  async update(@Req() req: RequestWithAuthId, @Body() data: ProfileUpdateDtoInput) {
    const user = await this.profilesService.update({
      where: {
        userId: req.authId,
      },
      data: {
        username: data.username,
        avatar: data.profilePicture,
        description: data.description,
      }
    });
    return {
      message: 'Profile updated successfully',
      data: null,
    }
  }

}
