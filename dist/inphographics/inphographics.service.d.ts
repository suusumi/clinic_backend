import { CreateInphographicDto } from './dto/create-inphographic.dto';
import { UpdateInphographicDto } from './dto/update-inphographic.dto';
import { DatabaseService } from "../database/database.service";
export declare class InphographicsService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createInphographicDto: CreateInphographicDto): Promise<{
        id: number;
        value: string;
        description: string;
    }>;
    findAll(): Promise<{
        id: number;
        value: string;
        description: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        value: string;
        description: string;
    }>;
    update(id: number, updateInphographicDto: UpdateInphographicDto): Promise<{
        id: number;
        value: string;
        description: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        value: string;
        description: string;
    }>;
    removeAll(): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
