import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'prisma/prisma/prisma.service';
import { SessionsModule } from 'src/sessions/sessions.module';

@Module({
  imports: [SessionsModule],
  controllers: [AuthenticationController],
  providers: [UsersService, PrismaService],
})
export class AuthenticationModule {}
