import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { PrismaService } from 'prisma/prisma/prisma.service';
import { SessionsModule } from 'src/sessions/sessions.module';

@Module({
  imports: [SessionsModule],
  controllers: [FollowersController],
  providers: [FollowersService, PrismaService],
})
export class FollowersModule { }
