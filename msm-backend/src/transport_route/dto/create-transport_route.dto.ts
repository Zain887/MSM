// src/transport/dto/create-transport-route.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsInt, Min, IsPhoneNumber } from "class-validator";

export class CreateTransportRouteDto {
    @ApiProperty({
        description: "UUID of the school",
        example: "b7a4b4f0-12d3-4c4d-b8d9-5a7d1a8f1c2e",
    })
    @IsUUID()
    schoolId: string;

    @ApiProperty({
        description: "Name of the transport route",
        example: "Route A - City Center to School",
    })
    @IsString()
    routeName: string;

    @ApiProperty({
        description: "Vehicle number/identifier",
        example: "ABC-1234",
    })
    @IsString()
    vehicleNumber: string;

    @ApiProperty({
        description: "Name of the driver",
        example: "Ahmed Khan",
    })
    @IsString()
    driverName: string;

    @ApiProperty({
        description: "Phone number of the driver",
        example: "+923001234567",
    })
    @IsPhoneNumber("PK") // you can adjust region or just use IsString if global
    driverPhone: string;

    @ApiProperty({
        description: "Seating capacity of the vehicle",
        example: 40,
    })
    @IsInt()
    @Min(1)
    capacity: number;

    @ApiProperty({
        description: "Monthly fee for using this transport route",
        example: 2000,
    })
    @IsInt()
    @Min(0)
    fee: number;
}
