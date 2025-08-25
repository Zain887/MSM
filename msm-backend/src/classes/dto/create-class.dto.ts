// src/classes/dto/create-class.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
    IsUUID,
    IsString,
    IsOptional,
    IsArray,
    IsInt,
    Min,
} from "class-validator";

export class CreateClassDto {
    @ApiProperty({
        description: "UUID of the school this class belongs to",
        example: "b5f4b3de-29f7-4c81-a0c5-d3fb0f768f61",
    })
    @IsUUID()
    schoolId: string;

    @ApiProperty({ description: "Class name", example: "Grade 10" })
    @IsString()
    name: string;

    @ApiProperty({ description: "Section of the class", example: "A" })
    @IsString()
    section: string;

    @ApiProperty({
        description: "UUID of the class teacher (optional)",
        example: "a7e8c3f1-11d2-4321-b987-9a4fba3e3a6c",
        required: false,
    })
    @IsOptional()
    classTeacherId?: string;

    @ApiProperty({
        description: "List of teacher IDs assigned to the class",
        example: [
            "d7f6c2aa-65f9-49c3-8b23-13b2340c76d2",
            "f3c94aa7-3187-4769-9340-72f52361f91f",
        ],
        required: false,
    })
    @IsOptional()
    @IsArray()
    teacherIds?: string[];

    @ApiProperty({
        description: "List of subject IDs taught in the class",
        example: [
            "7f2a97a9-5b21-41d0-bdf2-8cb7f674ea4f",
            "3d4f5f6a-123b-4a2c-98f7-df56bc2a6b42",
        ],
        required: false,
    })
    @IsOptional()
    @IsArray()
    subjectIds?: string[];

    @ApiProperty({
        description: "Maximum number of students allowed in the class",
        example: 40,
        required: false,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    capacity?: number;

    @ApiProperty({
        description: "Academic year this class belongs to",
        example: "2025-2026",
    })
    @IsString()
    academicYear: string;
}
