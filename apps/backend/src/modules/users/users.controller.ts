import {Body, Controller, Delete, Get, Request, Post, Put, UseGuards} from '@nestjs/common';
import type {User} from "prisma/client";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    findOne(@Request() req): Promise<User | null> {
        return this.usersService.findOne(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('me')
    update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(req.user.id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('me')
    remove(@Request() req) {
        return this.usersService.remove(req.user.id);
    }
}
