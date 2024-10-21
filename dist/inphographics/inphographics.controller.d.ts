import { InphographicsService } from './inphographics.service';
import { CreateInphographicDto } from './dto/create-inphographic.dto';
import { UpdateInphographicDto } from './dto/update-inphographic.dto';
export declare class InphographicsController {
    private readonly inphographicsService;
    constructor(inphographicsService: InphographicsService);
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
