import {IsString} from "class-validator";

export class AuthAdminDto {

    @IsString()
    login: string;

    @IsString()
    password: string;
}