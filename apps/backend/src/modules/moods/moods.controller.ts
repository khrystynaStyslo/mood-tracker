import {Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, HttpCode} from '@nestjs/common';
import {CreateMoodDto} from "./dto/create-mood.dto";
import {UpdateMoodDto} from "./dto/update-mood.dto";
import {MoodsService} from "./moods.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('moods')
@UseGuards(JwtAuthGuard)
export class MoodsController {
    constructor(private moodsService: MoodsService) {}

    @Get()
    findAll(@Request() req) {
        return this.moodsService.findAllForUser(req.user.id);
    }

    @Get(':id')
    findOne(@Request() req, @Param('id') id: string) {
        return this.moodsService.findOneForUser(req.user.id, id);
    }

    @Post()
    create(@Request() req, @Body() dto: CreateMoodDto) {
        return this.moodsService.createForUser(req.user.id, dto);
    }

    @Put(':id')
    update(
        @Request() req,
        @Param('id') id: string,
        @Body() dto: UpdateMoodDto,
    ) {
        return this.moodsService.updateForUser(req.user.id, id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Request() req, @Param('id') id: string) {
        return this.moodsService.removeForUser(req.user.id, id);
    }
}
