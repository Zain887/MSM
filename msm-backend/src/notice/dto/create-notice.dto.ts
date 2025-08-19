import { IsString, IsOptional, IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNoticeDto {
  @ApiProperty({ description: 'Notice title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Full notice content' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ description: 'Category of the notice, e.g. Event, Holiday' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ description: 'School UUID' })
  @IsUUID()
  schoolId: string;

  @ApiPropertyOptional({ description: 'UUID of the teacher who posted the notice' })
  @IsOptional()
  @IsUUID()
  postedById?: string;

  @ApiPropertyOptional({ description: 'Is the notice active or not' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
