import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthAdminDto } from './dto/auth-admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    registerAdmin(createAdminDto: CreateAdminDto): Promise<{
        id: number;
        login: string;
        password_hash: string;
        full_name: string;
    }>;
    authAdmin(authAdminDto: AuthAdminDto): Promise<{
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
