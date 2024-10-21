import {IsOptional, IsPositive, IsString} from "class-validator";

export class CreateServiceDto {

    @IsPositive()
    sub_category_id: number;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsPositive()
    price: number;
}

