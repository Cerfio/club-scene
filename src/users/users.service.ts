import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    async update({ where, data }: { where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput }) {
        try {
            return await this.prisma.user.update({
                where,
                data,
            });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    async get({ where, select }: { where: Prisma.UserWhereUniqueInput, select?: Prisma.UserSelect }) {
        try {
            return await this.prisma.user.findUnique({
                where,
                select
            });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    async delete({ where }: { where: Prisma.UserWhereUniqueInput }) {
        try {
            return await this.prisma.user.delete({
                where,
            });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong');
        }
    }
}
