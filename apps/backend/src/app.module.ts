import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoodsModule } from './modules/moods/moods.module';
import { UsersModule } from './modules/users/users.module';
import { TagsModule } from './modules/tags/tags.module';
import { MoodsService } from "./modules/moods/moods.service";
import { PrismaService } from './modules/prisma/prisma.service';
import { PrismaModule } from "./modules/prisma/prisma.module";
import {UsersService} from "./modules/users/users.service";
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule, MoodsModule, UsersModule, TagsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, MoodsService, PrismaService, UsersService],
})
export class AppModule {}
