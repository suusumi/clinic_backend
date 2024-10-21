import {IsString} from "class-validator";

export class CreateInphographicDto {

    @IsString()
    value: string;

    @IsString()
    description: string;

}
