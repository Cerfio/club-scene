import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [AuthenticationModule, UsersModule, ProfilesModule, MediaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
