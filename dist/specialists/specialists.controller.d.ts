/// <reference types="multer" />
import { SpecialistsService } from './specialists.service';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';
export declare class SpecialistsController {
    private readonly specialistsService;
    constructor(specialistsService: SpecialistsService);
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
    updatePhoto(id: number, file: Express.Multer.File): Promise<{
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
    createSpecialistWithImage(file: Express.Multer.File, bodyData: CreateSpecialistDto): Promise<{
        id: number;
        photo_path: string;
        name: string;
        post: string;
        speciality: string;
        degree: string;
        filial: import(".prisma/client").$Enums.SpecFilial;
    }>;
}
