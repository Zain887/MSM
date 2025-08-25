import { PartialType } from '@nestjs/swagger';
import { CreateLibraryBookDto } from './create-library.dto';

export class UpdateLibraryBookDto extends PartialType(CreateLibraryBookDto) {}
