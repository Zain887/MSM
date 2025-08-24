// src/exam-results/dto/create-exam-result.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsInt, Min, Max, IsOptional } from "class-validator";

export class CreateExamResultDto {
    @ApiProperty({
        description: "UUID of the school this exam result belongs to",
        example: "e3f8b2de-12a3-41e9-a7c3-98d2b876f111",
    })
    @IsUUID()
    schoolId: string;

    @ApiProperty({
        description: "UUID of the exam",
        example: "a7e8c3f1-11d2-4321-b987-9a4fba3e3a6c",
    })
    @IsUUID()
    examId: string;

    @ApiProperty({
        description: "UUID of the student",
        example: "c1b2d3e4-f5a6-7890-abcd-1234567890ef",
    })
    @IsUUID()
    studentId: string;

    @ApiProperty({
        description: "Marks obtained by the student",
        example: 85,
    })
    @IsInt()
    @Min(0)
    @Max(100)
    marksObtained: number;

    @ApiProperty({
        description: "Grade assigned based on marks",
        example: "A",
    })
    @IsString()
    grade: string;

    @ApiProperty({
        description: "Optional remarks about performance",
        example: "Excellent performance, keep it up!",
        required: false,
    })
    @IsOptional()
    @IsString()
    remarks?: string;
}
