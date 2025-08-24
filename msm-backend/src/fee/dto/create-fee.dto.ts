// src/fees/dto/create-fee.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
    IsUUID,
    IsInt,
    Min,
    IsString,
    IsDateString,
    IsEnum,
    IsOptional,
} from "class-validator";

export class CreateFeeDto {
    @ApiProperty({
        description: "UUID of the school this fee belongs to",
        example: "f7c2a1d3-1234-4a56-b7d8-abcdef123456",
    })
    @IsUUID()
    schoolId: string;

    @ApiProperty({
        description: "UUID of the student",
        example: "c1b2d3e4-f5a6-7890-abcd-1234567890ef",
    })
    @IsUUID()
    studentId: string;

    @ApiProperty({
        description: "UUID of the class",
        example: "b7e3c2f1-98a2-4d3a-92c3-abcdef123456",
    })
    @IsUUID()
    classId: string;

    @ApiProperty({
        description: "Total fee amount",
        example: 5000,
    })
    @IsInt()
    @Min(0)
    amount: number;

    @ApiProperty({
        description: "Due date for fee payment (ISO date format)",
        example: "2025-09-10",
    })
    @IsString()
    dueDate: string;

    @ApiProperty({
        description: "Amount already paid",
        example: 2000,
    })
    @IsInt()
    @Min(0)
    paidAmount: number;

    @ApiProperty({
        description: "Date when fee was paid (optional)",
        example: "2025-09-05",
        required: false,
    })
    @IsOptional()
    @IsDateString()
    paidDate?: Date;

    @ApiProperty({
        description: "Fee payment status",
        enum: ["unpaid", "partial", "paid"],
        example: "partial",
        default: "unpaid",
    })
    @IsEnum(["unpaid", "partial", "paid"])
    status: string;
}
