import {IsOptional, IsString} from "class-validator";

export class CreateBannerDto {

    @IsString()
    title: string;

    @IsString()
    subtitle: string;

    @IsString()
    text_content: string;

    @IsOptional()
    @IsString()
    img_path: string;

    @IsOptional()
    @IsString()
    banner_type: string;
}