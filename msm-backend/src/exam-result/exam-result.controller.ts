import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ExamResultService } from './exam-result.service';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';
import { ExamResult } from './entities/exam-result.entity';

@ApiTags('exam-results')
@Controller('exam-results')
export class ExamResultController {
  constructor(private readonly examResultService: ExamResultService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new exam result' })
  create(@Body() dto: CreateExamResultDto): Promise<ExamResult> {
    return this.examResultService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exam results' })
  findAll(): Promise<ExamResult[]> {
    return this.examResultService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an exam result by ID' })
  findOne(@Param('id') id: string): Promise<ExamResult> {
    return this.examResultService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an exam result by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateExamResultDto): Promise<ExamResult> {
    return this.examResultService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an exam result by ID' })
  remove(@Param('id') id: string): Promise<void> {
    return this.examResultService.remove(id);
  }
}
