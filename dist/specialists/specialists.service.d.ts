import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';
import { DatabaseService } from '../database/database.service';
export declare class SpecialistsService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createSpecialistDto: CreateSpecialistDto): Promise<{
        id: number;
        photo_path: string;
        name: string;
        post: string;
        speciality: string;
        degree: string;
        filial: import(".prisma/client").$Enums.SpecFilial;
    }>;
    findAll(): Promise<{
        id: number;
        photo_path: string;
        name: string;
        post: string;
        speciality: string;
        degree: string;
        filial: import(".prisma/client").$Enums.SpecFilial;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        photo_path: string;
        name: string;
        post: string;
        speciality: string;
        degree: string;
        filial: import(".prisma/client").$Enums.SpecFilial;
    }>;
    update(id: number, updateSpecialistDto: UpdateSpecialistDto): Promise<{
        id: number;
        photo_path: string;
        name: string;
        post: string;
        speciality: string;
        degree: string;
        filial: import(".prisma/client").$Enums.SpecFilial;
    }>;
    updatePhoto(id: number, photoPath: string): Promise<{
        id: number;
        photo_path: string;
        name: string;
        post: string;
        speciality: string;
        degree: string;
        filial: import(".prisma/client").$Enums.SpecFilial;
    }>;
    remove(id: number): Promise<{
        id: number;
        photo_path: string;
        name: string;
        post: string;
        speciality: string;
        degree: string;
        filial: import(".prisma/client").$Enums.SpecFilial;
    }>;
}
