import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { PrismaService } from 'prisma/prisma/prisma.service';
import { SessionsModule } from 'src/sessions/sessions.module';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  imports: [SessionsModule, FollowersModule, ProfilesModule],
  controllers: [FollowersController],
  providers: [FollowersService, PrismaService],
})
export class FollowersModule { }
