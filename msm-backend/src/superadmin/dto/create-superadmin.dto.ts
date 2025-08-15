// create-superadmin.dto.ts
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSuperAdminDto {
  @ApiProperty({ description: 'Full name of the super admin' })
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Email address of the super admin' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password (plain text, will be hashed in service)', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ description: 'Optional phone number' })
  @IsOptional()
  @IsString()
  phone?: string;
}
