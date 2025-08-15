import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { SchoolService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@ApiTags('schools')
@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new school (No auth required)' })
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all schools' })
  @ApiResponse({ status: 200, description: 'List of schools retrieved successfully.' })
  findAll() {
    return this.schoolService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a school by ID' })
  @ApiParam({ name: 'id', description: 'School ID' })
  findOne(@Param('id') id: string) {
    return this.schoolService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a school partially (No auth)' })
  updatePartial(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.update(id, updateSchoolDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a school (No auth)' })
  remove(@Param('id') id: string) {
    return this.schoolService.remove(id);
  }
}
