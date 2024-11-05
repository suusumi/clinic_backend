import { IsString, IsOptional } from 'class-validator';

export class UpdateAboutUsDto {
    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;
}