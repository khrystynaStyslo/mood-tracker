import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { CreateMoodDto } from "./dto/create-mood.dto";
import { UpdateMoodDto } from "./dto/update-mood.dto";

@Injectable()
export class MoodsService {
    constructor(private prisma: PrismaService) {}

    findAllForUser(userId: bigint) {
        return this.prisma.mood.findMany({
            where: { user_id: userId, deleted_at: null },
            include: {
                tags: true,
            },
        });
    }

    findOneForUser(userId: bigint, id: string) {
        return this.prisma.mood.findFirst({
            where: { id: BigInt(id), user_id: userId, deleted_at: null },
            include: {
                tags: true,
            },
        });
    }

    createForUser(userId: bigint, dto: CreateMoodDto) {
        const connectTags = dto.tagIds?.map(id => ({ id: BigInt(id) })) ?? [];

        return this.prisma.mood.create({
            data: {
                user_id:  userId,
                mood:     dto.mood,
                note:     dto.note,
                level:    dto.level,
                type:     dto.type,
                tags: {
                    connect: connectTags,
                },
            },
            include: { tags: true },
        });
    }

    updateForUser(userId: bigint, id: string, dto: UpdateMoodDto) {
        const { tagIds, ...data } = dto
        const connectTags = tagIds?.map(id => ({ id: BigInt(id) })) ?? [];

        return this.prisma.mood.update({
            where: { id: BigInt(id), user_id: userId },
            data: {
                ...data,
                tags: {
                    connect: connectTags,
                }
            },
            include: {
                tags: true,
            },
        });
    }

    removeForUser(userId: bigint, id: string) {
        return this.prisma.mood.deleteMany({
            where: { id: BigInt(id), user_id: userId },
        });
    }
}
