import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { FollowersService } from 'src/followers/followers.service';
import { TokenGuard } from 'src/interceptors/token-guard.interceptor';
import { MediaService } from 'src/media/media.service';
import { ViewsService } from 'src/views/views.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly followersService: FollowersService, private readonly viewsService: ViewsService) { }

  @UseInterceptors(TokenGuard)
  @Get()
  async getFeed(@Req() req: RequestWithAuthId) {
    try {
      const followers = await this.followersService.findAll({
        where: {
          followingId: req.authId,
        },
        include: {
          follower: {
            include: {
              medias: true,
            },
          },
        },
      });

      const viewsData = followers.flatMap((follower: any) =>
        follower.follower.medias.map((media: any) => ({
          mediaId: media.id,
          profileId: follower.follower.id,
        }))
      );

      await this.viewsService.createMany({
        data: viewsData,
      });

      const seenMediaIds = await this.viewsService.findMany({
        where: {
          profileId: req.authId,
        },
        select: {
          mediaId: true,
        },
      });

      const seen = seenMediaIds.map((view: any) => view.mediaId);

      return {
        message: 'Feed fetched successfully',
        data: {
          seen,
        },
      };
    } catch (error) {
      console.error('Error fetching feed:', error);
      throw new Error('Unable to fetch feed');
    }
  }
}
