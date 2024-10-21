import {IsOptional, IsString} from "class-validator";

export class CreateDocumentDto {

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    file_name: string;
}

// name        String
// description String? @default("doc")
// file_name   String?