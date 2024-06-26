import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { SessionsModule } from 'src/sessions/sessions.module';
import { FollowersService } from 'src/followers/followers.service';
import { PrismaService } from 'prisma/prisma/prisma.service';
import { ViewsModule } from 'src/views/views.module';
import { ViewsService } from 'src/views/views.service';
import { MediaService } from 'src/media/media.service';
import { ProfilesService } from 'src/profiles/profiles.service';

@Module({
  imports: [SessionsModule],
  controllers: [FeedController],
  providers: [FollowersService, PrismaService, ViewsService, MediaService, ProfilesService],
})
export class FeedModule { }
