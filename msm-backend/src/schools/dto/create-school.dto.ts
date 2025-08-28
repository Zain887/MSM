import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, IsInt, IsObject } from 'class-validator';

export class CreateSchoolDto {
  @ApiProperty({ example: 'Springfield High School' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'SCH-2025-001' })
  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @ApiProperty({ enum: ['public', 'private', 'international'] })
  @IsEnum(['public', 'private', 'international'])
  type: 'public' | 'private' | 'international';

  @ApiProperty({ example: '123 Main St' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'Lahore' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Punjab' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'Pakistan' })
  @IsString()
  country: string;

  @ApiProperty({ example: '54000' })
  @IsString()
  postalCode: string;

  @ApiProperty({ required: false, example: 'school@example.com' })
  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @ApiProperty({ required: false, example: '+92-300-1234567' })
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @ApiProperty({ required: false, example: 'https://school.edu' })
  @IsOptional()
  @IsUrl()
  websiteUrl?: string;

  @ApiProperty({ required: false, example: 'https://placehold.co/200x200?text=Logo' })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiProperty({ required: false, example: 1995 })
  @IsOptional()
  @IsInt()
  establishedYear?: number;

  @ApiProperty({
    required: false,
    example: { gradingSystem: 'GPA', currency: 'PKR', language: 'en' }
  })
  @IsOptional()
  @IsObject()
  settings?: Record<string, any> = {
    gradingSystem: 'GPA',
    currency: 'PKR',
    language: 'en'
  };

  @ApiProperty({ required: false, enum: ['active', 'inactive'], default: 'active' })
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
