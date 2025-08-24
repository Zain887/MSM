// src/exams/dto/create-exam.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
    IsUUID,
    IsString,
    IsDateString,
    IsInt,
    Min,
    IsOptional,
} from "class-validator";

export class CreateExamDto {
    @ApiProperty({
        description: "UUID of the school this exam belongs to",
        example: "a2f4c1d2-98a3-4f2e-b7d3-1234567890ab",
    })
    @IsUUID()
    schoolId: string;

    @ApiProperty({
        description: "Name of the exam",
        example: "Mid Term Exam",
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: "Type of exam",
        example: "Written",
    })
    @IsString()
    type: string;

    @ApiProperty({
        description: "UUID of the class this exam is for",
        example: "b1d2c3e4-f5a6-7890-abcd-0987654321ef",
    })
    @IsUUID()
    classId: string;

    @ApiProperty({
        description: "UUID of the subject this exam is for",
        example: "d3f4c5b6-a7b8-9012-cdef-34567890abcd",
    })
    @IsUUID()
    subjectId: string;

    @ApiProperty({
        description: "Date of the exam (ISO format)",
        example: "2025-10-05",
    })
    @IsDateString()
    examDate: Date;

    @ApiProperty({
        description: "Start time of the exam (HH:mm format)",
        example: "09:00",
    })
    @IsString()
    startTime: string;

    @ApiProperty({
        description: "End time of the exam (HH:mm format)",
        example: "12:00",
    })
    @IsString()
    endTime: string;

    @ApiProperty({
        description: "Maximum marks for the exam",
        example: 100,
    })
    @IsInt()
    @Min(1)
    maxMarks: number;

    @ApiProperty({
        description: "Minimum passing marks for the exam",
        example: 40,
    })
    @IsInt()
    @Min(0)
    passingMarks: number;
}
