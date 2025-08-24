// src/library/dto/create-library-book.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsInt, Min } from "class-validator";

export class CreateLibraryDto {
    @ApiProperty({
        description: "UUID of the school this book belongs to",
        example: "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    })
    @IsUUID()
    schoolId: string;

    @ApiProperty({
        description: "Title of the book",
        example: "Introduction to Algorithms",
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: "Author of the book",
        example: "Thomas H. Cormen",
    })
    @IsString()
    author: string;

    @ApiProperty({
        description: "ISBN number of the book",
        example: "9780262033848",
    })
    @IsString()
    isbn: string;

    @ApiProperty({
        description: "Category or genre of the book",
        example: "Computer Science",
    })
    @IsString()
    category: string;

    @ApiProperty({
        description: "Total number of copies in library",
        example: 10,
    })
    @IsInt()
    @Min(1)
    copies: number;

    @ApiProperty({
        description: "Number of copies currently available",
        example: 7,
        default: 0,
    })
    @IsInt()
    @Min(0)
    available: number;
}
