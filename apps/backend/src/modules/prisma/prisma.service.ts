import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma } from 'prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            log: ['query', 'info', 'warn', 'error'],
        });

        this.$use(async (params: Prisma.MiddlewareParams, next) => {
            if (params.action === 'delete') {
                params.action = 'update';
                params.args['data'] = { deleted_at: new Date() };
            }
            return next(params);
        });

        this.$use(async (params: Prisma.MiddlewareParams, next) => {
            if (params.model === 'Mood') {
                if (params.action === 'findUnique') {
                    params.action = 'findFirst';
                }
                if (['findFirst', 'findMany'].includes(params.action)) {params.args = params.args ?? {};
                    params.args.where = {
                        ...(params.args.where ?? {}),
                        deleted_at: null,
                    };
                }
            }
            return next(params);
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}