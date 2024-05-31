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

    async create({ data }: { data: Prisma.FollowCreateInput }) {
        try {
            return await this.prismaService.follow.create({
                data,
            });
        } catch (error) {
            throw new InternalServerErrorException('something went wrong');
        }
    }

    async findAll({ where, include }: { where: Prisma.FollowWhereInput, include?: Prisma.FollowInclude }) {
        try {
            return await this.prismaService.follow.findMany({
                where,
                include,
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

