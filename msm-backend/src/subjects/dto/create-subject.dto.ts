// src/subjects/dto/create-subject.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
    IsUUID,
    IsString,
    IsOptional,
    IsEnum,
    IsInt,
    IsArray,
} from "class-validator";

export class CreateSubjectDto {
    @ApiProperty({
        description: "UUID of the school this subject belongs to",
        example: "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    })
    @IsUUID()
    schoolId: string;

    @ApiProperty({
        description: "Name of the subject",
        example: "Mathematics",
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: "Unique subject code",
        example: "MATH101",
    })
    @IsString()
    code: string;

    @ApiProperty({
        description: "Type of subject",
        enum: ["core", "elective"],
        example: "core",
    })
    @IsEnum(["core", "elective"])
    type: string;

    @ApiProperty({
        description: "Number of credits for this subject (if applicable)",
        example: 3,
        required: false,
    })
    @IsOptional()
    @IsInt()
    credits?: number;

    @ApiProperty({
        description: "List of teacher UUIDs assigned to this subject",
        example: ["teacher-uuid-1", "teacher-uuid-2"],
        required: false,
        type: [String],
    })
    @IsOptional()
    @IsArray()
    teacherIds?: string[];

    @ApiProperty({
        description: "List of class UUIDs where this subject is taught",
        example: ["class-uuid-1", "class-uuid-2"],
        required: false,
        type: [String],
    })
    @IsOptional()
    @IsArray()
    classIds?: string[];
}
