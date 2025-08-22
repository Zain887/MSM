import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { SchoolService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School } from './entities/school.entity';

@ApiTags('Schools')
@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new school' })
  @ApiResponse({ status: 201, description: 'School created successfully', type: School })
  @ApiResponse({ status: 400, description: 'Validation error' })
  create(@Body() dto: CreateSchoolDto) {
    return this.schoolService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all schools' })
  @ApiResponse({ status: 200, description: 'List of schools', type: [School] })
  findAll() {
    return this.schoolService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a school by ID' })
  @ApiResponse({ status: 200, description: 'School found', type: School })
  @ApiResponse({ status: 404, description: 'School not found' })
  findOne(@Param('id') id: string) {
    return this.schoolService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a school by ID' })
  @ApiResponse({ status: 200, description: 'School updated successfully', type: School })
  @ApiResponse({ status: 404, description: 'School not found' })
  update(@Param('id') id: string, @Body() dto: UpdateSchoolDto) {
    return this.schoolService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a school by ID' })
  @ApiResponse({ status: 200, description: 'School deleted successfully' })
  @ApiResponse({ status: 404, description: 'School not found' })
  remove(@Param('id') id: string) {
    return this.schoolService.remove(id);
  }
}
