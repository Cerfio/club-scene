import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async create({ data }: { data: Prisma.UserCreateInput }) {
        try {
            return await this.prisma.user.create({
                data,
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('User already exists');
            }
        }
    }

    async update({ where, data }: { where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput }) {
        return this.prisma.user.update({
            where,
            data,
        });
    }

    async get({ where }: { where: Prisma.UserWhereUniqueInput }) {
        return this.prisma.user.findUnique({
            where,
        });
    }
}
