// src/teachers/dto/create-teacher.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
    IsUUID,
    IsString,
    IsEnum,
    IsEmail,
    IsDateString,
    IsInt,
    IsOptional,
    IsArray,
} from "class-validator";

export class CreateTeacherDto {
    @ApiProperty({
        description: "UUID of the school this teacher belongs to",
        example: "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    })
    @IsUUID()
    schoolId: string;

    @ApiProperty({ description: "Unique employee code", example: "EMP-00123" })
    @IsString()
    employeeCode: string;

    @ApiProperty({ description: "First name", example: "Ali" })
    @IsString()
    firstName: string;

    @ApiProperty({ description: "Last name", example: "Khan" })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: "Gender of the teacher",
        enum: ["male", "female", "other"],
        example: "male",
    })
    @IsEnum(["male", "female", "other"])
    gender: string;

    @ApiProperty({ description: "Date of birth", example: "1985-07-15" })
    @IsDateString()
    dob: Date;

    @ApiProperty({ description: "Email address", example: "ali.khan@example.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ description: "Phone number", example: "+92 300 1234567" })
    @IsString()
    phone: string;

    @ApiProperty({ description: "Residential address", example: "123 Street, Lahore" })
    @IsString()
    address: string;

    @ApiProperty({ description: "Highest qualification", example: "MSc Mathematics" })
    @IsString()
    qualification: string;

    @ApiProperty({ description: "Years of teaching experience", example: 8 })
    @IsInt()
    experienceYears: number;

    @ApiProperty({ description: "Date of joining the school", example: "2015-09-01" })
    @IsDateString()
    joiningDate: Date;

    @ApiProperty({ description: "Designation", example: "Senior Teacher" })
    @IsString()
    designation: string;

    @ApiProperty({ description: "Department", example: "Mathematics" })
    @IsString()
    department: string;

    @ApiProperty({
        description: "List of subject UUIDs this teacher teaches",
        example: ["subject-uuid-1", "subject-uuid-2"],
        required: false,
        type: [String],
    })
    @IsOptional()
    @IsArray()
    subjectIds?: string[];

    @ApiProperty({
        description: "List of class UUIDs this teacher is assigned to",
        example: ["class-uuid-1", "class-uuid-2"],
        required: false,
        type: [String],
    })
    @IsOptional()
    @IsArray()
    classIds?: string[];

    @ApiProperty({ description: "Monthly salary", example: 60000, required: false })
    @IsOptional()
    @IsInt()
    salary?: number;

    @ApiProperty({
        description: "Profile photo URL",
        example: "https://dummyimage.com/200x200/000/fff",
        required: false,
    })
    @IsOptional()
    @IsString()
    photoUrl?: string;

    @ApiProperty({
        description: "Employment status",
        enum: ["active", "inactive"],
        example: "active",
        required: false,
    })
    @IsOptional()
    @IsEnum(["active", "inactive"])
    status?: string;
}
