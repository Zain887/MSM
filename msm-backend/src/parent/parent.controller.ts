import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ParentService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';

@ApiTags('parents')
@Controller('parents')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new parent record' })
  create(@Body() dto: CreateParentDto) {
    return this.parentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all parents' })
  findAll() {
    return this.parentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get parent by ID' })
  findOne(@Param('id') id: string) {
    return this.parentService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update parent by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateParentDto) {
    return this.parentService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete parent by ID' })
  remove(@Param('id') id: string) {
    return this.parentService.remove(id);
  }
}
