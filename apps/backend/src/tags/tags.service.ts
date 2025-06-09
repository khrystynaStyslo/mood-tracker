import { Injectable, NotFoundException } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateTagDto} from "./dto/create-tag.dto";
import {UpdateTagDto} from "./dto/update-tag.dto";

@Injectable()
export class TagsService {
    constructor(private prisma: PrismaService) {}

    findAllForUser(userId: bigint) {
        return this.prisma.tag.findMany({
            where: { user_id: userId, deleted_at: null },
        });
    }

    findOneForUser(userId: bigint, id: string) {
        return this.prisma.tag.findFirst({
            where: { id: BigInt(id), user_id: userId, deleted_at: null },
        });
    }

    createForUser(userId: bigint, dto: CreateTagDto) {
        return this.prisma.tag.create({
            data: {
                user_id:  userId,
                name:     dto.name,
                color:    dto.color,
            },
        });
    }

    async updateForUser(userId: bigint, id: string, dto: UpdateTagDto) {
        const existing = await this.prisma.tag.findFirst({
            where: { id: BigInt(id), user_id: userId, deleted_at: null },
        });
        if (!existing) {
            throw new NotFoundException(`Tag with id ${id} not found`);
        }

        return this.prisma.tag.update({
            where: { id: BigInt(id) },
            data: dto,
        });
    }

    async removeForUser(userId: bigint, id: string) {
        const existing = await this.prisma.tag.findFirst({
            where: { id: BigInt(id), user_id: userId, deleted_at: null },
        });
        if (!existing) {
            throw new NotFoundException(`Tag with id ${id} not found`);
        }

        return this.prisma.tag.delete({
            where: { id: BigInt(id) },
        });
    }
}
