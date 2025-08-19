import { IsOptional, IsString, IsUUID, IsEmail, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ description: 'First name of the student', example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the student', example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ description: 'Gender of the student', example: 'Male' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ description: 'Date of birth (ISO string)', example: '2000-01-01' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ description: 'Admission number', example: 'ADM12345' })
  @IsOptional()
  @IsString()
  admissionNumber?: string;

  @ApiPropertyOptional({ description: 'Admission date', example: '2025-08-15' })
  @IsOptional()
  @IsDateString()
  admissionDate?: string;

  @ApiPropertyOptional({ description: 'Email address', example: 'student@school.com'})
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '+1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Address', example: '123 Main St, City, Country' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Profile image URL' })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @ApiPropertyOptional({ description: 'Roll number' })
  @IsOptional()
  @IsString()
  rollNumber?: string;

  @ApiPropertyOptional({ description: 'Section' })
  @IsOptional()
  @IsString()
  section?: string;

  // @ApiPropertyOptional({ description: 'Hostel Room ID' })
  // @IsOptional()
  // @IsUUID()
  // hostelRoomId?: string;

  // @ApiPropertyOptional({ description: 'Transport Assignment ID' })
  // @IsOptional()
  // @IsUUID()
  // transportAssignmentId?: string;

  @ApiPropertyOptional({ description: 'Status' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Remarks' })
  @IsOptional()
  @IsString()
  remarks?: string;

  /** RELATION IDs - REQUIRED **/
  @ApiProperty({ description: 'School ID' })
  @IsUUID()
  schoolId: string;

  @ApiProperty({ description: 'Parent IDs (array)' })
  parentIds: string;

  @ApiProperty({ description: 'Class ID' })
  @IsUUID()
  classId: string;

  @ApiPropertyOptional({ description: 'Subject IDs (array)' })
  @IsOptional()
  subjectIds?: string[];
}
