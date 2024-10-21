import { Injectable, INestApplication } from '@nestjs/common'
import { PrismaClient, $Enums } from '@prisma/client'

@Injectable()
export class DatabaseService extends PrismaClient {
    async onModuleInit () {
        await this.$connect();
    }
    async onModuleDestroy () {
        await this.$disconnect();
    }

    // безнадёжно устарело, теперь в main.ts строчка app.enableShutdownHooks()
    // async enableShutdownHooks (app: INestApplication) {
    //     this.$on('beforeExit', async () => {
    //         await app.close();
    //     });
    //
    // }
}