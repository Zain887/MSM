import { IsUUID, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceDto {
  @ApiProperty({ description: 'School ID', format: 'uuid' })
  @IsUUID()
  schoolId: string;

  @ApiProperty({ description: 'Student ID', format: 'uuid' })
  @IsUUID()
  studentId: string;

  @ApiProperty({ description: 'Date of attendance', type: String, format: 'date-time' })
  @IsDateString()
  date: string;  // ISO date string

  @ApiProperty({ enum: ['Present', 'Absent', 'Late'], default: 'Present' })
  @IsEnum(['Present', 'Absent', 'Late'])
  status: 'Present' | 'Absent' | 'Late';
}
