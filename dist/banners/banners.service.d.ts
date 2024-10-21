import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { DatabaseService } from '../database/database.service';
export declare class BannersService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createBannerDto: CreateBannerDto): Promise<{
        id: number;
        title: string;
        subtitle: string;
        text_content: string;
        banner_type: string;
        img_path: string;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        subtitle: string;
        text_content: string;
        banner_type: string;
        img_path: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        subtitle: string;
        text_content: string;
        banner_type: string;
        img_path: string;
    }>;
    update(id: number, updateBannerDto: UpdateBannerDto): Promise<{
        id: number;
        title: string;
        subtitle: string;
        text_content: string;
        banner_type: string;
        img_path: string;
    }>;
    updateImage(id: number, imgPath: string): Promise<{
        id: number;
        title: string;
        subtitle: string;
        text_content: string;
        banner_type: string;
        img_path: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        subtitle: string;
        text_content: string;
        banner_type: string;
        img_path: string;
    }>;
}
