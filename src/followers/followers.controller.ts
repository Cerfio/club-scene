import { Body, Controller, Get, Post, Req, UseInterceptors } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { TokenGuard } from 'src/interceptors/token-guard.interceptor';
import { FollowersCreateDtoInput } from './dto/followers-create.input.dto';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) { }

  @UseInterceptors(TokenGuard)
  @Post()
  async create(@Req() req: RequestWithAuthId, @Body() followersCreateDtoInput: FollowersCreateDtoInput) {
    const follower = await this.followersService.create({
      data: {
        follower: {
          connect: {
            userId: req.authId,
          }
        },
        following: {
          connect: {
            id: followersCreateDtoInput.profileId,
          }
        }
      }
    });
    return {
      message: 'Follower created successfully',
      data: follower,
    }
  }

  @UseInterceptors(TokenGuard)
  @Get()
  async findAll(@Req() req: RequestWithAuthId) {
    const followers = await this.followersService.findAll({
      follower: {
        userId: req.authId,
      }
    });
    return {
      message: 'Followers fetched successfully',
      data: followers,
    }
  }
}
