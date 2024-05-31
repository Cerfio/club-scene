import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma/prisma.service';

@Injectable()
export class FollowersService {
    constructor(private prismaService: PrismaService) { }

    async create({ data }: { data: Prisma.FollowCreateInput }) {
        try {
            return await this.prismaService.follow.create({
                data,
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException('profile not found');
            }
        }
    }

    async findAll(where: Prisma.FollowWhereInput) {
        return await this.prismaService.follow.findMany({
            where,
        });
    }

    async delete({ where }: { where: Prisma.FollowWhereUniqueInput }) {
        return await this.prismaService.follow.delete({
            where,
        });
    }
}

