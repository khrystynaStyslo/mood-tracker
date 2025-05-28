import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';
import { AppModule } from '../dist/app.module';

let serverlessHandler: ReturnType<typeof serverlessExpress>;

async function bootstrap() {
    // 1) Створюємо свій Express-додаток
    const expressApp = express();
    const adapter   = new ExpressAdapter(expressApp);

    // 2) Інтегруємо NestJS
    const app = await NestFactory.create(AppModule, adapter);
    app.enableCors();
    // тут ще pipes/filters/interceptors…
    await app.init();

    // 3) «Запікаємо» expressApp в Lambda-handler
    serverlessHandler = serverlessExpress({ app: expressApp });
}

export const handler = async (event: any, context: any) => {
    if (!serverlessHandler) {
        await bootstrap();
    }
    // кожен наступний виклик одразу передає подію в готовий handler
    return serverlessHandler(event, context);
};