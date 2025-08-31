import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new subject' })
  @ApiResponse({ status: 201, description: 'The subject has been successfully created.' })
  @ApiResponse({ status: 404, description: 'School not found' })
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subjects' })
  @ApiResponse({ status: 200, description: 'Return all subjects' })
  async findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subject by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the subject' })
  @ApiResponse({ status: 200, description: 'Return subject by ID' })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  async findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update subject by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the subject' })
  @ApiResponse({ status: 200, description: 'The subject has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  async update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete subject by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the subject' })
  @ApiResponse({ status: 200, description: 'The subject has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  async remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }
}
