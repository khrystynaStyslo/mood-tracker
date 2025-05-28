import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoodsModule } from './moods/moods.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import * as Joi from 'joi';
import {EnvConfig} from "./config/env.interface";

@Module({
  imports: [
    ConfigModule.forRoot<EnvConfig>({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        NODE_ENV:       Joi.string().valid('development','production','test').default('development'),
        PORT:           Joi.number().default(3000),
        DATABASE_URL:   Joi.string().uri().required(),
        JWT_SECRET:     Joi.string().min(32).required(),
        JWT_EXPIRES_IN: Joi.string().default('1h'),
        CORS_ORIGINS:   Joi.string().default(''),
      }),
    }),
      PrismaModule, MoodsModule, UsersModule, TagsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
