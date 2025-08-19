import { IsUUID, IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 'uuid-of-school' })
  @IsUUID()
  schoolId: string;

  @ApiProperty({ example: 'Annual Sports Day' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'This event is for all grades.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2025-08-15T09:00:00Z' })
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({ example: '2025-08-15T17:00:00Z' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ example: 'Main Sports Ground' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
