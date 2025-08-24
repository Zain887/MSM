// src/parents/dto/create-parent.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
    IsUUID,
    IsString,
    IsEmail,
    IsEnum,
    IsOptional,
    IsArray,
} from "class-validator";

export class CreateParentDto {
    @ApiProperty({
        description: "UUID of the school this parent belongs to",
        example: "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    })
    @IsUUID()
    schoolId: string;

    @ApiProperty({ description: "First name of the parent", example: "John" })
    @IsString()
    firstName: string;

    @ApiProperty({ description: "Last name of the parent", example: "Doe" })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: "Relation of the parent to the student",
        enum: ["father", "mother", "guardian"],
        example: "father",
    })
    @IsEnum(["father", "mother", "guardian"])
    relation: string;

    @ApiProperty({
        description: "Email address of the parent",
        example: "parent@example.com",
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Phone number of the parent",
        example: "+92-300-1234567",
    })
    @IsString()
    phone: string;

    @ApiProperty({
        description: "Residential address",
        example: "123 Main Street, Karachi, Pakistan",
    })
    @IsString()
    address: string;

    @ApiProperty({
        description: "Occupation of the parent",
        example: "Engineer",
        required: false,
    })
    @IsOptional()
    @IsString()
    occupation?: string;

    @ApiProperty({
        description: "National ID number",
        example: "42101-1234567-1",
        required: false,
    })
    @IsOptional()
    @IsString()
    nationalId?: string;

    @ApiProperty({
        description: "Photo URL of the parent",
        example: "https://dummyimage.com/300x300/000/fff&text=Parent",
        required: false,
    })
    @IsOptional()
    @IsString()
    photoUrl?: string;

    @ApiProperty({
        description: "Array of student UUIDs associated with this parent",
        example: ["aabbcc11-2233-4455-6677-8899aabbccdd"],
        required: false,
        type: [String],
    })
    @IsOptional()
    @IsArray()
    studentIds?: string[];
}
