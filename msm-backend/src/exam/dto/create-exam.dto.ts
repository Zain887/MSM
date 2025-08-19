import { IsUUID, IsString, IsOptional, IsDateString, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExamDto {
  @ApiProperty({ description: 'ID of the school' })
  @IsUUID()
  schoolId: string;

  @ApiProperty({ description: 'ID of the class' })
  @IsUUID()
  classId: string;

  @ApiPropertyOptional({ description: 'ID of the subject', nullable: true })
  @IsUUID()
  @IsOptional()
  subjectId?: string;

  @ApiProperty({ description: 'Title of the exam', example: 'Midterm Exam' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Description of the exam', nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Date of the exam (ISO string)', example: '2023-10-01T10:00:00Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'Total marks for the exam', example: 100 })
  @IsInt()
  totalMarks: number;
}
