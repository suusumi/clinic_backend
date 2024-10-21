import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthAdminDto } from './dto/auth-admin.dto';
import { DatabaseService } from "../database/database.service";
export declare class AdminService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createAdminDto: CreateAdminDto): Promise<{
        id: number;
        login: string;
        password_hash: string;
        full_name: string;
    }>;
    authAsAdmin(authAdminDto: AuthAdminDto): Promise<{
        id: number;
        login: string;
        password_hash: string;
        full_name: string;
    }>;
    findAll(): Promise<{
        id: number;
        login: string;
        password_hash: string;
        full_name: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        login: string;
        password_hash: string;
        full_name: string;
    }>;
    update(id: number, updateAdminDto: UpdateAdminDto): Promise<{
        id: number;
        login: string;
        password_hash: string;
        full_name: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        login: string;
        password_hash: string;
        full_name: string;
    }>;
}
