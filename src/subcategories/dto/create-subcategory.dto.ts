import {IsPositive, IsString} from "class-validator";

export class CreateSubcategoryDto {

    @IsPositive()
    category_id: number;

    @IsString()
    name: string;
}
