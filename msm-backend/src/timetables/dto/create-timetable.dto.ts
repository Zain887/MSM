// src/timetables/dto/create-timetable.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
    IsUUID,
    IsString,
    IsOptional,
} from "class-validator";

export class CreateTimetableDto {
    @ApiProperty({
        description: "UUID of the school",
        example: "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    })
    @IsUUID()
    schoolId: string;

    @ApiProperty({
        description: "UUID of the class",
        example: "class-uuid-1234",
    })
    @IsString()
    classId: string;

    @ApiProperty({
        description: "Day of the week",
        example: "Monday",
    })
    @IsString()
    day: string;

    @ApiProperty({
        description: "Period name or number",
        example: "1st Period",
    })
    @IsString()
    period: string;

    @ApiProperty({
        description: "UUID of the subject",
        example: "subject-uuid-5678",
    })
    @IsString()
    subjectId: string;

    @ApiProperty({
        description: "UUID of the teacher",
        example: "teacher-uuid-91011",
    })
    @IsString()
    teacherId: string;

    @ApiProperty({
        description: "Start time of the period",
        example: "09:00",
    })
    @IsString()
    startTime: string;

    @ApiProperty({
        description: "End time of the period",
        example: "09:45",
    })
    @IsString()
    endTime: string;
}
