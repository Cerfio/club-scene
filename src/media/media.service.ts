import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma/prisma.service';

@Injectable()
export class MediaService {
    constructor(private prismaService: PrismaService) { }


    async create({ data }: { data: Prisma.MediaCreateInput }) {
        try {
            return await this.prismaService.media.create({
                data,
            });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    async update({ where, data }: { where: Prisma.MediaWhereUniqueInput, data: Prisma.MediaUpdateInput }) {
        try {
            return await this.prismaService.media.update({
                where,
                data,
            });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    //feed //user posts
    async findAll({ where, orderBy }: { where: Prisma.MediaWhereInput, orderBy?: Prisma.MediaOrderByWithRelationInput | Prisma.MediaOrderByWithRelationInput[] }) {
        try {
            return await this.prismaService.media.findMany({
                where,
                orderBy,
            });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    async delete({ where }: { where: Prisma.MediaWhereUniqueInput }) {
        try {
            return await this.prismaService.media.delete({
                where,
            });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    async get({ where, select }: { where: Prisma.MediaWhereUniqueInput, select?: Prisma.MediaSelect }) {
        try {
            return await this.prismaService.media.findUnique({
                where,
                select,
            });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong');
        }
    }
}
