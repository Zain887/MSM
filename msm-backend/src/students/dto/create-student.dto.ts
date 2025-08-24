// src/students/dto/create-student.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
    IsUUID,
    IsString,
    IsOptional,
    IsEmail,
    IsEnum,
    IsDateString,
    IsArray,
} from "class-validator";

export class CreateStudentDto {
    @ApiProperty({
        description: "UUID of the school this student belongs to",
        example: "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    })
    @IsUUID()
    schoolId: string;

    @ApiProperty({
        description: "Unique admission number for the student",
        example: "ADM-2025-001",
    })
    @IsString()
    admissionNumber: string;

    @ApiProperty({ description: "Roll number of the student", example: "23" })
    @IsString()
    rollNo: string;

    @ApiProperty({ description: "First name of the student", example: "Ali" })
    @IsString()
    firstName: string;

    @ApiProperty({ description: "Last name of the student", example: "Khan" })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: "Gender of the student",
        enum: ["male", "female", "other"],
        example: "male",
    })
    @IsEnum(["male", "female", "other"])
    gender: string;

    @ApiProperty({
        description: "Date of birth of the student",
        example: "2010-05-15",
    })
    @IsDateString()
    dob: Date;

    @ApiProperty({
        description: "Blood group of the student",
        example: "B+",
        required: false,
    })
    @IsOptional()
    @IsString()
    bloodGroup?: string;

    @ApiProperty({
        description: "National ID / B-Form number of the student",
        example: "42101-1234567-1",
        required: false,
    })
    @IsOptional()
    @IsString()
    nationalId?: string;

    @ApiProperty({
        description: "Profile photo URL",
        example: "https://dummyimage.com/300x300/000/fff&text=Student",
        required: false,
    })
    @IsOptional()
    @IsString()
    photoUrl?: string;

    @ApiProperty({
        description: "Email address of the student",
        example: "student@example.com",
        required: false,
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
        description: "Phone number of the student",
        example: "+92-300-1234567",
        required: false,
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({
        description: "Residential address of the student",
        example: "123 Main Street, Lahore, Pakistan",
    })
    @IsString()
    address: string;

    @ApiProperty({
        description: "Date of enrollment",
        example: "2023-09-01",
    })
    @IsDateString()
    enrollmentDate: Date;

    @ApiProperty({
        description: "Class ID to which the student belongs",
        example: "class-uuid-here",
    })
    @IsString()
    classId: string;

    @ApiProperty({
        description: "Section name or identifier",
        example: "A",
    })
    @IsString()
    section: string;

    @ApiProperty({
        description: "List of parent UUIDs associated with the student",
        example: ["parent-uuid-1", "parent-uuid-2"],
        required: false,
        type: [String],
    })
    @IsOptional()
    @IsArray()
    parentIds?: string[];

    @ApiProperty({
        description: "Hostel ID if student is assigned to hostel",
        example: "hostel-uuid-here",
        required: false,
    })
    @IsOptional()
    @IsString()
    hostelId?: string;

    @ApiProperty({
        description: "Transport route ID if student uses school transport",
        example: "route-uuid-here",
        required: false,
    })
    @IsOptional()
    @IsString()
    transportRouteId?: string;

    @ApiProperty({
        description: "Current status of the student",
        enum: ["active", "inactive", "graduated", "left"],
        default: "active",
    })
    @IsOptional()
    @IsEnum(["active", "inactive", "graduated", "left"])
    status?: string;
}
