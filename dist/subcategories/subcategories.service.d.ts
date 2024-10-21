import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { DatabaseService } from "../database/database.service";
export declare class SubcategoriesService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createSubcategoryDto: CreateSubcategoryDto): Promise<{
        id: number;
        category_id: number;
        name: string;
    }>;
    findAll(): Promise<{
        id: number;
        category_id: number;
        name: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        category_id: number;
        name: string;
    }>;
    findSubCategoriesByCategory(category_id: number): Promise<{
        id: number;
        category_id: number;
        name: string;
    }[]>;
    update(id: number, updateSubcategoryDto: UpdateSubcategoryDto): Promise<{
        id: number;
        category_id: number;
        name: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        category_id: number;
        name: string;
    }>;
}
