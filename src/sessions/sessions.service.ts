import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma/prisma.service';

@Injectable()
export class SessionsService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async create({ data }: { data: Prisma.SessionCreateInput }) {
        try {
            await this.prisma.session.create({
                data,
            });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    async get({ where }: { where: Prisma.SessionWhereUniqueInput }) {
        try {
            return await this.prisma.session.findUnique({
                where,
            });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong');
        }
    }
}
