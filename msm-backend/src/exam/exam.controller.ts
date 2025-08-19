import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities/exam.entity';

@ApiTags('exams')
@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new exam' })
  create(@Body() dto: CreateExamDto): Promise<Exam> {
    return this.examService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exams' })
  findAll(): Promise<Exam[]> {
    return this.examService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exam by ID' })
  findOne(@Param('id') id: string): Promise<Exam> {
    return this.examService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an exam by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateExamDto): Promise<Exam> {
    return this.examService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an exam by ID' })
  remove(@Param('id') id: string): Promise<void> {
    return this.examService.remove(id);
  }
}
