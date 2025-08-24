// src/events/dto/create-event.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsDateString, IsOptional } from "class-validator";

export class CreateEventDto {
    @ApiProperty({
        description: "UUID of the school this event belongs to",
        example: "f3c8b1de-72a3-41e9-a7c3-98d2b876f111",
    })
    @IsUUID()
    schoolId: string;

    @ApiProperty({
        description: "Title of the event",
        example: "Annual Sports Day",
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: "Detailed description of the event",
        example: "A full-day event including athletics, games, and award distribution.",
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: "Date of the event (ISO date format)",
        example: "2025-09-15",
    })
    @IsDateString()
    date: Date;

    @ApiProperty({
        description: "Location where the event will be held",
        example: "Main School Ground",
    })
    @IsString()
    location: string;

    @ApiProperty({
        description: "Optional photo URL for the event",
        example: "https://dummyimage.com/600x400/000/fff&text=Sports+Day",
        required: false,
    })
    @IsOptional()
    @IsString()
    photoUrl?: string;
}
