import { IsOptional, IsString, IsUUID, IsEmail, IsArray, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EntityGender, ISODateString } from '../../types/type'; // adjust the import path

export class CreateTeacherDto {
  @ApiProperty({ description: 'First name of the teacher', example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the teacher', example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ description: 'Gender of the teacher', example: 'Male' })
  @IsOptional()
  @IsString()
  gender?: EntityGender | null;

  @ApiPropertyOptional({ description: 'Date of birth of the teacher', example: '1980-01-01' })
  @IsOptional()
  @IsString()
  dateOfBirth?: ISODateString | null;

  @ApiProperty({ description: 'Email of the teacher', example: 'teacher@school.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: 'Phone number of the teacher', example: '+1234567890' })
  @IsOptional()
  @IsString()
  phone?: string | null;

  @ApiPropertyOptional({ description: 'Address of the teacher', example: '123 Main St, City, Country' })
  @IsOptional()
  @IsString()
  address?: string | null;

  @ApiPropertyOptional({ description: 'Profile image URL of the teacher', example: 'https://randomuser.me/api/portraits/lego/1.jpg' })
  @IsOptional()
  @IsString()
  profileImageUrl?: string | null;

  @ApiProperty({ description: 'UUID of the school this teacher belongs to', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  schoolId: string;

  @ApiProperty({ description: 'Array of subject IDs assigned to the teacher', example: ['sub1', 'sub2'] })
  @IsArray()
  @IsString({ each: true })
  subjectIds?: string[];

  @ApiPropertyOptional({ description: 'Teacher qualifications', example: 'MSc Physics' })
  @IsOptional()
  @IsString()
  qualification?: string | null;

  @ApiPropertyOptional({ description: 'Years of teaching experience', example: 5 })
  @IsOptional()
  @IsNumber()
  experienceYears?: number | null;
}
