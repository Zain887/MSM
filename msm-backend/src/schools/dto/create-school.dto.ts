import { IsNotEmpty, IsOptional, IsString, IsEmail, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty({ description: 'Name of the school', example: 'Greenwood High' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Address of the school', example: '123 Main St, Springfield' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Contact email of the school', example: 'admin@admin.com'})
  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @ApiPropertyOptional({ description: 'Contact phone number of the school', example: '+1234567890' })
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @ApiProperty({ description: 'ID of the Super Admin this school belongs to', example: 'uuid-of-superadmin' })
  @IsUUID()
  @IsNotEmpty()
  superAdminId: string;
}
