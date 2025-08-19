import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { FeeStatus } from '../entities/fee.entity';

export class CreateFeeDto {
  @ApiProperty({ description: 'School UUID' })
  @IsUUID()
  schoolId: string;

  @ApiProperty({ description: 'Student UUID' })
  @IsUUID()
  studentId: string;

  @ApiProperty({ description: 'Amount of the fee' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Due date of the fee' })
  @IsDateString()
  dueDate: string;

  @ApiPropertyOptional({ enum: FeeStatus, description: 'Status of the fee' })
  @IsEnum(FeeStatus)
  @IsOptional()
  status?: FeeStatus;

  @ApiPropertyOptional({ description: 'Payment method (e.g. Cash, Bank Transfer)' })
  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @ApiPropertyOptional({ description: 'Transaction ID or reference' })
  @IsString()
  @IsOptional()
  transactionId?: string;
}
