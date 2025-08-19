import { 
  IsOptional, 
  IsString, 
  IsBoolean, 
  ValidateNested, 
  IsUUID 
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class SettingsDto {
  @ApiPropertyOptional({ description: 'Currency code, e.g., USD, PKR', example: 'USD' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ description: 'Date format string, e.g., YYYY-MM-DD', example: '1997-05-01' })
  @IsOptional()
  @IsString()
  dateFormat?: string;

  @ApiPropertyOptional({ description: 'Grading system, e.g., percentage, GPA, letter', example: 'percentage' })
  @IsOptional()
  @IsString()
  gradingSystem?: string;

  @ApiPropertyOptional({ description: 'Enable SMS notifications flag', example: true })
  @IsOptional()
  @IsBoolean()
  enableSMSNotifications?: boolean;

  @ApiPropertyOptional({ description: 'Enable email notifications flag', example: true })
  @IsOptional()
  @IsBoolean()
  enableEmailNotifications?: boolean;

  @ApiPropertyOptional({ description: 'URL for the school logo image', example: 'https://example.com/logo.png' })
  @IsOptional()
  @IsString()
  schoolLogoUrl?: string;
}

export class CreateSchoolSettingDto {
  @ApiProperty({ description: 'UUID of the school this setting belongs to' })
  @IsUUID()
  schoolId: string;

  @ApiPropertyOptional({ type: SettingsDto, description: 'Settings details', example: { currency: 'USD', dateFormat: 'YYYY-MM-DD' } })
  @IsOptional()
  @ValidateNested()
  @Type(() => SettingsDto)
  settings?: SettingsDto;
}
