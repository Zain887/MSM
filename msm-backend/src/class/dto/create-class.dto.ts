import { IsUUID, IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({ example: 'Grade 10 - A' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Section B' })
  @IsOptional()
  @IsString()
  section?: string;

  @ApiProperty({ example: 'uuid-of-school' })
  @IsUUID()
  schoolId: string;

  @ApiPropertyOptional({ example: ['uuid-of-teacher1', 'uuid-of-teacher2'] })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  teacherIds?: string[];
}
