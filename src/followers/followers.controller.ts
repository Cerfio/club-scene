import { BadRequestException, Body, ConflictException, Controller, Get, Post, Req, UseInterceptors } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { TokenGuard } from 'src/interceptors/token-guard.interceptor';
import { FollowersCreateDtoInput } from './dto/followers-create.input.dto';
import { ProfilesService } from 'src/profiles/profiles.service';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService, private readonly profilesService: ProfilesService) { }

  @UseInterceptors(TokenGuard)
  @Post()
  async create(@Req() req: RequestWithAuthId, @Body() followersCreateDtoInput: FollowersCreateDtoInput) {
    const selfProfileId = await this.profilesService.get({
      where: {
        userId: req.authId,
      }
    });

    if (followersCreateDtoInput.profileId === selfProfileId.id) {
      throw new ConflictException('Cannot follow yourself');
    }

    const isFollowing = await this.followersService.findAll({
      where: {
        followingId: followersCreateDtoInput.profileId,
        AND: {
          follower: {
            userId: req.authId,
          }
        }
      }
    });
    if (isFollowing.length > 0) {
      return {
        message: 'Already following this user',
        data: null
      }
    }
    console.log(isFollowing)
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
      data: null,
    }
  }

  @UseInterceptors(TokenGuard)
  @Get()
  async findAll(@Req() req: RequestWithAuthId) {
    const followers = await this.followersService.findAll({
      where: {
        follower: {
          userId: req.authId,
        }
      }
    });
    return {
      message: 'Followers fetched successfully',
      data: followers,
    }
  }
}
