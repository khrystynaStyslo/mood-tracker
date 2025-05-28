import { Module } from '@nestjs/common';
import { MoodsController } from './moods.controller';
import { MoodsService } from './moods.service';
import {PrismaService} from "../prisma/prisma.service";

@Module({
  controllers: [MoodsController],
  providers: [MoodsService, PrismaService]
})
export class MoodsModule {
  constructor(private moodsService: MoodsService) {}
}
