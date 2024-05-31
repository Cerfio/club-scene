import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma/prisma.service';
import { ViewsService } from './views.service';

@Module({
  providers: [PrismaService],
  exports: [ViewsService],
})
export class ViewsModule { }
