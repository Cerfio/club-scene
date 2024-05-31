import { Controller, Get, InternalServerErrorException, Req, UseInterceptors } from '@nestjs/common';
import { FollowersService } from 'src/followers/followers.service';
import { TokenGuard } from 'src/interceptors/token-guard.interceptor';
import { MediaService } from 'src/media/media.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { ViewsService } from 'src/views/views.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly followersService: FollowersService, private readonly viewsService: ViewsService, private readonly mediasService: MediaService, private readonly profilesService: ProfilesService) { }

  @UseInterceptors(TokenGuard)
  @Get()
  async getFeed(@Req() req: RequestWithAuthId) {
    try {
      const profile = await this.profilesService.get({
        where: {
          userId: req.authId,
        }
      });

      const followingIds = await this.followersService.findAll({
        where: {
          follower: {
            userId: req.authId,
          },
        },
        select: {
          following: {
            select: {
              id: true,
            },
          },
        }
      }).then(follows => follows.map(follow => follow.following.id));
      const feed = await this.mediasService.findAll({
        where: {
          profileId: {
            in: followingIds,
          },
          views: {
            none: {
              profile: {
                userId: req.authId,
              }
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      await this.viewsService.createMany({
        data: feed.map(media => ({
          mediaId: media.id,
          profileId: profile.id,
        })),
      });

      return {
        message: 'Feed fetched successfully',
        data: feed,
      };
    } catch (error) {
      console.error('Error fetching feed:', error);
      throw new InternalServerErrorException('Unable to fetch feed');
    }
  }
}
