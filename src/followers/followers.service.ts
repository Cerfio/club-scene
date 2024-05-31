import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma/prisma.service';

@Injectable()
export class FollowersService {
    constructor(private prismaService: PrismaService) { }

    async get({ where }: { where: Prisma.FollowWhereUniqueInput }) {
        try {
            return await this.prismaService.follow.findUnique({
                where,
            });
        } catch (error) {
            throw new InternalServerErrorException('something went wrong');
        }
    }

    async create({ data, select }: { data: Prisma.FollowCreateInput, select?: Prisma.FollowSelect }) {
        try {
            return await this.prismaService.follow.create({
                data,
                select,
            });
        } catch (error) {
            throw new InternalServerErrorException('something went wrong');
        }
    }

    async findAll({ where, select }: { where: Prisma.FollowWhereInput, select?: Prisma.FollowInclude }) {
        try {
            return await this.prismaService.follow.findMany({
                where,
                select,
            });
        } catch (error) {
            throw new InternalServerErrorException('something went wrong');
        }
    }

    async delete({ where }: { where: Prisma.FollowWhereUniqueInput }) {
        try {
            return await this.prismaService.follow.delete({
                where,
            });
        } catch (error) {
            throw new InternalServerErrorException('something went wrong');
        }
    }
}

