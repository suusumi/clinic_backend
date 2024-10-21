import { PrismaClient } from '@prisma/client';
export declare class DatabaseService extends PrismaClient {
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
