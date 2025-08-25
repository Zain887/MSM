import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { ClassesService } from "./classes.service";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { Class } from "./entities/class.entity";

@ApiTags("Classes")
@Controller("classes")
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }

  @Post()
  @ApiOperation({ summary: "Create a new class" })
  @ApiResponse({ status: 201, description: "Class created successfully", type: Class })
  @ApiResponse({ status: 404, description: "School not found" })
  create(@Body() dto: CreateClassDto) {
    return this.classesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all classes" })
  @ApiResponse({ status: 200, description: "List of classes", type: [Class] })
  findAll() {
    return this.classesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a class by ID" })
  @ApiParam({ name: "id", type: String, description: "UUID of the class" })
  @ApiResponse({ status: 200, description: "Class found", type: Class })
  @ApiResponse({ status: 404, description: "Class not found" })
  findOne(@Param("id") id: string) {
    return this.classesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a class" })
  @ApiParam({ name: "id", type: String, description: "UUID of the class" })
  @ApiResponse({ status: 200, description: "Class updated successfully", type: Class })
  update(@Param("id") id: string, @Body() dto: UpdateClassDto) {
    return this.classesService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a class" })
  @ApiParam({ name: "id", type: String, description: "UUID of the class" })
  @ApiResponse({ status: 200, description: "Class deleted successfully" })
  remove(@Param("id") id: string) {
    return this.classesService.remove(id);
  }
}
