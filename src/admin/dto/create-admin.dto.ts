import {IsOptional, IsString} from "class-validator";

export class CreateAdminDto {

    @IsString()
    login: string;

    @IsString()
    password_hash: string;

    @IsOptional()
    @IsString()
    full_name: string;
}
