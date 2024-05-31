import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma/prisma.service';

@Injectable()
export class SessionsService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async create({ data }: { data: Prisma.SessionCreateInput }) {
        await this.prisma.session.create({
            data,
        });
    }

    async get({ where }: { where: Prisma.SessionWhereUniqueInput }) {
        return this.prisma.session.findUnique({
            where,
        });
    }
}
