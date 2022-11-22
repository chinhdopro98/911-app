import { PartialType } from '@nestjs/swagger';
import { CreateInterpreterlanguageDto } from './create-interpreterlanguage.dto';

export class UpdateInterpreterlanguageDto extends PartialType(CreateInterpreterlanguageDto) {}
