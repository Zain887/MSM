import { IsNotEmpty, IsOptional, IsString, IsUUID, ArrayNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty({ description: 'Name of the subject', example: 'Mathematics' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Subject code', example: 'MATH101' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ description: 'School ID', example: 'school-uuid' })
  @IsUUID()
  @IsNotEmpty()
  schoolId: string;

  @ApiProperty({ description: 'Class IDs assigned to this subject', example: ['class-uuid1', 'class-uuid2'] })
  @IsUUID('all', { each: true })
  @ArrayNotEmpty()
  classIds?: string[];

  @ApiPropertyOptional({ description: 'Teacher IDs assigned to this subject', example: ['teacher-uuid1', 'teacher-uuid2'] })
  @IsUUID('all', { each: true })
  @IsOptional()
  teacherIds?: string[];
}
