import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
export declare class SubcategoriesController {
    private readonly subcategoriesService;
    constructor(subcategoriesService: SubcategoriesService);
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
