import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
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
