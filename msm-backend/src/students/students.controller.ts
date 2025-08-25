import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Student } from './entities/student.entity';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  /** ✅ Create */
  @Post()
  @ApiOperation({ summary: 'Create a new student' })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({ status: 201, description: 'Student created successfully', type: Student })
  async create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  /** ✅ Get all */
  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'List of students', type: [Student] })
  async findAll() {
    return this.studentsService.findAll();
  }

  /** ✅ Get one */
  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID' })
  @ApiParam({ name: 'id', type: String, description: 'UUID of the student' })
  @ApiResponse({ status: 200, description: 'Student found', type: Student })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  /** ✅ Update */
  @Put(':id')
  @ApiOperation({ summary: 'Update a student' })
  @ApiParam({ name: 'id', type: String, description: 'UUID of the student' })
  @ApiBody({ type: UpdateStudentDto })
  @ApiResponse({ status: 200, description: 'Student updated successfully', type: Student })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(id, dto);
  }

  /** ✅ Delete */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student' })
  @ApiParam({ name: 'id', type: String, description: 'UUID of the student' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
