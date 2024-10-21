import {IsOptional, IsString} from "class-validator";

export class CreateContactDto {

    @IsOptional()
    @IsString()
    first_tel: string;

    @IsOptional()
    @IsString()
    second_tel: string;

    @IsOptional()
    @IsString()
    mail: string;

    @IsOptional()
    @IsString()
    street: string;

    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    vk_link: string;

    @IsOptional()
    @IsString()
    tg_link: string;

    @IsOptional()
    @IsString()
    wa_link: string;

    @IsOptional()
    @IsString()
    email_link: string;
}

// first_tel  String?
// second_tel String?
// mail       String?
// street     String?
// city       String  @default("Волгоград")
// vk_link    String?
// tg_link    String?
// wa_link    String?
// email_link String?