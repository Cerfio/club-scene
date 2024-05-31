import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { MediaModule } from './media/media.module';
import { FollowersModule } from './followers/followers.module';
import { FeedModule } from './feed/feed.module';
import { ViewsService } from './views/views.service';

@Module({
  imports: [AuthenticationModule, UsersModule, ProfilesModule, MediaModule, FollowersModule, FeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
