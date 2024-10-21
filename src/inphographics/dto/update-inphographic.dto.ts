import { PartialType } from '@nestjs/swagger';
import { CreateInphographicDto } from './create-inphographic.dto';

export class UpdateInphographicDto extends PartialType(CreateInphographicDto) {}
