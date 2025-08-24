// src/attendance/dto/create-attendance.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsEnum, IsOptional } from "class-validator";

export class CreateAttendanceDto {
    @ApiProperty({
        description: "UUID of the school this attendance belongs to",
        example: "c3f8b2de-12a3-41e9-a7c3-98d2b876f123",
    })
    @IsUUID()
    schoolId: string;

    @ApiProperty({
        description: "UUID of the student",
        example: "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
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
        description: "Date of attendance (ISO format)",
        example: "2025-08-24",
    })
    @IsString()
    date: string;

    @ApiProperty({
        description: "Attendance status",
        enum: ["present", "absent", "leave", "late"],
        example: "present",
    })
    @IsEnum(["present", "absent", "leave", "late"])
    status: string;

    @ApiProperty({
        description: "Optional remarks",
        example: "Arrived 10 minutes late due to traffic",
        required: false,
    })
    @IsOptional()
    @IsString()
    remarks?: string;
}
