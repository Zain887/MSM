import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { SchoolSettingsService } from './school-settings.service';
import { CreateSchoolSettingDto } from './dto/create-school-setting.dto';
import { UpdateSchoolSettingDto } from './dto/update-school-setting.dto';

@ApiTags('school-settings')
@Controller('school-settings')
export class SchoolSettingsController {
  constructor(private readonly schoolSettingsService: SchoolSettingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create school settings' })
  async create(@Body() dto: CreateSchoolSettingDto) {
    return await this.schoolSettingsService.create(dto);
  }

  @Get(':schoolId')
  @ApiOperation({ summary: 'Get school settings by school ID' })
  async findBySchool(@Param('schoolId') schoolId: string) {
    return await this.schoolSettingsService.findBySchoolId(schoolId);
  }

  @Put(':schoolId')
  @ApiOperation({ summary: 'Update school settings by school ID' })
  async update(
    @Param('schoolId') schoolId: string,
    @Body() dto: UpdateSchoolSettingDto,
  ) {
    return await this.schoolSettingsService.update(schoolId, dto);
  }

  @Delete(':schoolId')
  @ApiOperation({ summary: 'Delete school settings by school ID' })
  async remove(@Param('schoolId') schoolId: string) {
    return await this.schoolSettingsService.remove(schoolId);
  }
}
