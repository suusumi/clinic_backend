import {IsOptional, IsString} from "class-validator";

export class CreateAboutUsDto {
    @IsString()
    content: string;

    @IsString()
    imageUrl: string;
}