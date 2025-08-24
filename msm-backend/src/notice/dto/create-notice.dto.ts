// src/notices/dto/create-notice.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsDateString, IsEnum, IsOptional } from "class-validator";

export class CreateNoticeDto {
    @ApiProperty({
        description: "UUID of the school this notice belongs to",
        example: "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    })
    @IsUUID()
    schoolId: string;

    @ApiProperty({
        description: "Title of the notice",
        example: "Winter Vacations Announcement",
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: "Detailed description of the notice",
        example: "The school will remain closed from Dec 20, 2025 to Jan 5, 2026 for winter break.",
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: "Date of the notice (ISO format)",
        example: "2025-12-15",
    })
    @IsDateString()
    date: Date;

    @ApiProperty({
        description: "Category of the notice",
        enum: ["general", "exam", "event", "holiday"],
        example: "holiday",
    })
    @IsEnum(["general", "exam", "event", "holiday"])
    category: string;

    @ApiProperty({
        description: "Optional attachment URL (PDF, image, etc.)",
        example: "https://dummyimage.com/600x400/000/fff&text=Holiday+Notice",
        required: false,
    })
    @IsOptional()
    @IsString()
    attachmentUrl?: string;
}
