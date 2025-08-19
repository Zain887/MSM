import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@ApiTags('notices')
@Controller('notices')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notice' })
  create(@Body() dto: CreateNoticeDto) {
    return this.noticeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notices' })
  findAll() {
    return this.noticeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notice by ID' })
  findOne(@Param('id') id: string) {
    return this.noticeService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a notice by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateNoticeDto) {
    return this.noticeService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notice by ID' })
  remove(@Param('id') id: string) {
    return this.noticeService.remove(id);
  }
}
