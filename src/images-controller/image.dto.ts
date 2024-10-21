import {IsString} from "class-validator";

export class imageDTO {

    @IsString()
    img_path: string;
}