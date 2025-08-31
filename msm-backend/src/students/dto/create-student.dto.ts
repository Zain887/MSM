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
    @ApiProperty({ description: "UUID of the school", example: "a1b2c3d4-5678-90ab-cdef-1234567890ab" })
    @IsUUID()
    schoolId: string;

    @ApiProperty({ description: "Unique admission number", example: "ADM-2025-001" })
    @IsString()
    admissionNumber: string;

    @ApiProperty({ description: "Roll number", example: "23" })
    @IsString()
    rollNo: string;

    @ApiProperty({ description: "First name", example: "Ali" })
    @IsString()
    firstName: string;

    @ApiProperty({ description: "Last name", example: "Khan" })
    @IsString()
    lastName: string;

    @ApiProperty({ description: "Gender", enum: ["male", "female", "other"], example: "male" })
    @IsEnum(["male", "female", "other"])
    gender: string;

    @ApiProperty({ description: "Date of birth", example: "2010-05-15" })
    @IsDateString()
    dob: string; // ✅ must be string here (ISO date string)

    @ApiProperty({ description: "Blood group", example: "B+", required: false })
    @IsOptional()
    @IsString()
    bloodGroup?: string;

    @ApiProperty({ description: "National ID", example: "42101-1234567-1", required: false })
    @IsOptional()
    @IsString()
    nationalId?: string;

    @ApiProperty({ description: "Profile photo URL", example: "https://dummyimage.com/300x300/000/fff&text=Student", required: false })
    @IsOptional()
    @IsString()
    photoUrl?: string;

    @ApiProperty({ description: "Email", example: "student@example.com", required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ description: "Phone", example: "+92-300-1234567", required: false })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ description: "Address", example: "123 Main Street, Lahore" })
    @IsString()
    address: string;

    @ApiProperty({ description: "Enrollment date", example: "2023-09-01" })
    @IsDateString()
    enrollmentDate: string;

    @ApiProperty({ description: "Class ID", example: "class-uuid-here", required: false })
    @IsOptional()
    classId?: string | null; // ✅ now optional/nullable

    @ApiProperty({ description: "Section", example: "A" })
    @IsString()
    section: string;

    @ApiProperty({ description: "Parent UUIDs", example: ["parent-uuid-1"], required: false, type: [String] })
    @IsOptional()
    @IsArray()
    parentIds?: string[]; // ✅ array, not single parentId

    @ApiProperty({ description: "Hostel ID", example: "hostel-uuid-here", required: false })
    @IsOptional()
    hostelId?: string | null;

    @ApiProperty({ description: "Transport route ID", example: "route-uuid-here", required: false })
    @IsOptional()
    transportRouteId?: string | null;

    @ApiProperty({ description: "Status", enum: ["active", "inactive", "graduated", "left"], default: "active" })
    @IsOptional()
    @IsEnum(["active", "inactive", "graduated", "left"])
    status?: string;

    @ApiProperty({ description: "Religion", example: "Islam", required: false })
    @IsOptional()
    @IsString()
    religion?: string;
}
