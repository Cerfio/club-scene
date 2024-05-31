import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfileController } from './profiles.controller';
import { PrismaService } from 'prisma/prisma/prisma.service';
import { SessionsModule } from 'src/sessions/sessions.module';

@Module({
  imports: [SessionsModule],
  controllers: [ProfileController],
  providers: [ProfilesService, PrismaService],
})
export class ProfilesModule { }
