import { DatabaseService } from "./database/database.service";
export declare class AppService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    getHello(): Promise<string>;
}
