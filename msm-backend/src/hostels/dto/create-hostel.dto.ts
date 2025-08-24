// src/hostels/dto/create-hostel.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsInt, Min } from "class-validator";

export class CreateHostelDto {
    @ApiProperty({
        description: "UUID of the school this hostel belongs to",
        example: "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    })
    @IsUUID()
    schoolId: string;

    @ApiProperty({
        description: "Name of the hostel",
        example: "Boys Hostel Block A",
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: "Type of hostel (e.g., boys, girls, staff)",
        example: "Boys",
    })
    @IsString()
    type: string;

    @ApiProperty({
        description: "Total student capacity of the hostel",
        example: 200,
    })
    @IsInt()
    @Min(1)
    capacity: number;

    @ApiProperty({
        description: "Monthly hostel fee",
        example: 15000,
    })
    @IsInt()
    @Min(0)
    fee: number;
}
