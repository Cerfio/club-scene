import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma/prisma.service';

@Injectable()
export class ViewsService {
    constructor(private prismaService: PrismaService) { }

    async createMany({ data }: { data: Prisma.ViewCreateManyInput[] }) {
        try {
            return await this.prismaService.view.createMany({
                data,
            });
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    async findAll(where: Prisma.ViewWhereInput) {
        try {
            return await this.prismaService.view.findMany({
                where,
            });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    async findMany({ where, select }: { where: Prisma.ViewWhereInput, select?: Prisma.ViewSelect }) {
        try {
            return await this.prismaService.view.findMany({
                where,
                select,
            });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong');
        }
    }
}
