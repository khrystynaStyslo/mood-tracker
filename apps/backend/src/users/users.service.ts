import {Injectable, NotFoundException} from '@nestjs/common';
import type {User} from "prisma/client";
import {PrismaService} from "../prisma/prisma.service";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findOne(id: string) {
        const idBigInt = BigInt(id);

        return this.prisma.user.findUnique({
            where: { id: idBigInt }
        })
    }

    async findByEmail(email: string): Promise<User> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async create(createUserDto) {
        return this.prisma.user.create({
            data: createUserDto,
        })
    }

    async update(id: string, dto: UpdateUserDto): Promise<User> {
        const idBigInt = BigInt(id);

        const existing = await this.findOne(id);
        if (!existing) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        const data: Record<string, any> = {};
        if (dto.name !== undefined) data.name = dto.name;
        if (dto.email !== undefined) data.email = dto.email;
        if (dto.password !== undefined) data.password = dto.password;

        return this.prisma.user.update({
            where: { id: idBigInt },
            data,
        });
    }


    async remove(id: string): Promise<void> {
        const idBigInt = BigInt(id);
        
        const existing = await this.findOne(id);
        if (!existing) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        await this.prisma.user.delete({
            where: { id: idBigInt },
        });
    }
}
