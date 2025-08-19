import { IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({ example: 'Monthly Attendance Report' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Detailed attendance report for August 2025' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'School UUID' })
  @IsUUID()
  schoolId: string;
}
