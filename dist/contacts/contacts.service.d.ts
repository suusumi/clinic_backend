import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { DatabaseService } from "../database/database.service";
export declare class ContactsService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createContactDto: CreateContactDto): Promise<{
        id: number;
        first_tel: string;
        second_tel: string;
        mail: string;
        street: string;
        city: string;
        vk_link: string;
        tg_link: string;
        wa_link: string;
        email_link: string;
    }>;
    findAll(): Promise<{
        id: number;
        first_tel: string;
        second_tel: string;
        mail: string;
        street: string;
        city: string;
        vk_link: string;
        tg_link: string;
        wa_link: string;
        email_link: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        first_tel: string;
        second_tel: string;
        mail: string;
        street: string;
        city: string;
        vk_link: string;
        tg_link: string;
        wa_link: string;
        email_link: string;
    }>;
    update(id: number, updateContactDto: UpdateContactDto): Promise<{
        id: number;
        first_tel: string;
        second_tel: string;
        mail: string;
        street: string;
        city: string;
        vk_link: string;
        tg_link: string;
        wa_link: string;
        email_link: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        first_tel: string;
        second_tel: string;
        mail: string;
        street: string;
        city: string;
        vk_link: string;
        tg_link: string;
        wa_link: string;
        email_link: string;
    }>;
}
