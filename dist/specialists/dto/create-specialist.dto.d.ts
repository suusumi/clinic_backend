import { SpecFilial } from "@prisma/client";
export declare class CreateSpecialistDto {
    photo_path: string;
    name: string;
    post: string;
    speciality: string;
    degree: string;
    filial: SpecFilial;
}
