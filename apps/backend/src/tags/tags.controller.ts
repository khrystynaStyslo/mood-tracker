import {Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, HttpCode} from '@nestjs/common';
import {CreateTagDto} from "./dto/create-tag.dto";
import {UpdateTagDto} from "./dto/update-tag.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {TagsService} from "./tags.service";

@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagsController {
    constructor(private tagsService: TagsService) {}

    @Get()
    findAll(@Request() req) {
        return this.tagsService.findAllForUser(req.user.id);
    }

    @Get(':id')
    findOne(@Request() req, @Param('id') id: string) {
        return this.tagsService.findOneForUser(req.user.id, id);
    }

    @Post()
    create(@Request() req, @Body() dto: CreateTagDto) {
        return this.tagsService.createForUser(req.user.id, dto);
    }

    @Put(':id')
    update(
        @Request() req,
        @Param('id') id: string,
        @Body() dto: UpdateTagDto,
    ) {
        return this.tagsService.updateForUser(req.user.id, id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Request() req, @Param('id') id: string) {
        return this.tagsService.removeForUser(req.user.id, id);
    }
}
