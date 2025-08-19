import { IsString, IsOptional, IsUUID, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateParentDto {
  @ApiProperty({ example: 'John', description: 'First name of the parent' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the parent' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ example: 'male', description: 'Gender of the parent' })
  @IsOptional()
  @IsString()
  gender?: 'male' | 'female' | 'other';

  @ApiPropertyOptional({ example: 'john.doe@example.com', description: 'Email of the parent' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+1234567890', description: 'Phone number of the parent' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: '123 Elm Street', description: 'Address of the parent' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'Software Engineer', description: 'Occupation of the parent' })
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiPropertyOptional({ example: 'Father', description: 'Relationship to student' })
  @IsOptional()
  @IsString()
  relationshipToStudent?: string;

  @ApiPropertyOptional({ example: 'https://randomuser.me/api/portraits/lego/1.jpg', description: 'Profile image URL' })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @ApiProperty({ description: 'UUID of the school the parent belongs to' })
  @IsUUID()
  schoolId: string;

  @ApiPropertyOptional({ description: 'Array of student IDs associated with this parent', type: [String] })
  @IsOptional()
  studentIds?: string[];
}
