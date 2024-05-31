import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma/prisma.service';

@Injectable()
export class ProfilesService {
    constructor(private prismaService: PrismaService) {

    }

    async get({ where, select }: { where: Prisma.ProfileWhereUniqueInput, select?: Prisma.ProfileSelect }) {
        try {
            return await this.prismaService.profile.findUnique({
                where,
                select,
            });
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    async update({ where, data }: { where: Prisma.ProfileWhereUniqueInput, data: Prisma.ProfileUpdateInput }) {
        try {
            return await this.prismaService.profile.update({
                where,
                data,
            });
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Something went wrong');
        }
    }
}
