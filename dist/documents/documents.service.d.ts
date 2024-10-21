import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DatabaseService } from '../database/database.service';
export declare class DocumentsService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    create(createDocumentDto: CreateDocumentDto): Promise<{
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
    update(id: number, updateDocumentDto: UpdateDocumentDto): Promise<{
        id: number;
        name: string;
        description: string;
        file_name: string;
    }>;
    updateFile(id: number, fileName: string): Promise<{
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
