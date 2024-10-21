import {IsString, IsOptional, IsNumber} from "class-validator";
import {DatabaseService} from "../../database/database.service";
import {SpecFilial} from "@prisma/client";
export class CreateSpecialistDto {

    @IsOptional()
    @IsString()
    photo_path: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    post: string;

    @IsOptional()
    @IsString()
    speciality: string;

    @IsOptional()
    @IsString()
    degree: string;

    @IsOptional()
    @IsString()
    filial: SpecFilial;
}
