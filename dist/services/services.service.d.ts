import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { DatabaseService } from "../database/database.service";
export declare class ServicesService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createServiceDto: CreateServiceDto): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        sub_category_id: number;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        sub_category_id: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        sub_category_id: number;
    }>;
    findServicesBySubCategory(sub_category_id: number): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        sub_category_id: number;
    }[]>;
    update(id: number, updateServiceDto: UpdateServiceDto): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        sub_category_id: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        sub_category_id: number;
    }>;
}
