import { Injectable } from '@nestjs/common';
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

    updateForUser(userId: bigint, id: string, dto: UpdateTagDto) {
        return this.prisma.tag.updateMany({
            where: { id: BigInt(id), user_id: userId },
            data: dto,
        });
    }

    removeForUser(userId: bigint, id: string) {
        return this.prisma.tag.deleteMany({
            where: { id: BigInt(id), user_id: userId },
        });
    }
}
