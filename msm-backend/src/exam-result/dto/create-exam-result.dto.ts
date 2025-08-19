import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateExamResultDto {
  @ApiProperty({ description: 'School ID' })
  @IsUUID()
  schoolId: string;

  @ApiProperty({ description: 'Exam ID' })
  @IsUUID()
  examId: string;

  @ApiProperty({ description: 'Student ID' })
  @IsUUID()
  studentId: string;

  @ApiProperty({ description: 'Obtained marks', example: 85 })
  @IsInt()
  obtainedMarks: number;

  @ApiPropertyOptional({ description: 'Total marks', nullable: true })
  @IsInt()
  @IsOptional()
  totalMarks?: number;

  @ApiPropertyOptional({ description: 'Remarks or comments', nullable: true })
  @IsString()
  @IsOptional()
  remarks?: string;
}
