/// <reference types="multer" />
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Response } from "express";
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    create(createDocumentDto: CreateDocumentDto): Promise<{
        id: number;
        name: string;
        description: string;
        file_name: string;
    }>;
    createDocumentWithFile(file: Express.Multer.File, bodyData: CreateDocumentDto): Promise<{
        id: number;
        name: string;
        description: string;
        file_name: string;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        description: string;
        file_name: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        description: string;
        file_name: string;
    }>;
    getFileById(id: number, res: Response): Promise<void>;
    getFileByName(file_name: string, res: Response): Promise<void>;
    update(id: number, updateDocumentDto: UpdateDocumentDto): Promise<{
        id: number;
        name: string;
        description: string;
        file_name: string;
    }>;
    updateFile(id: number, file: Express.Multer.File): Promise<{
        id: number;
        name: string;
        description: string;
        file_name: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        description: string;
        file_name: string;
    }>;
}
