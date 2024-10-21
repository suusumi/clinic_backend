/// <reference types="multer" />
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
export declare class BannersController {
    private readonly bannersService;
    constructor(bannersService: BannersService);
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
    updateImage(id: number, file: Express.Multer.File): Promise<{
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
    createBannerWithImage(file: Express.Multer.File, bodyData: CreateBannerDto): Promise<{
        id: number;
        title: string;
        subtitle: string;
        text_content: string;
        banner_type: string;
        img_path: string;
    }>;
}
