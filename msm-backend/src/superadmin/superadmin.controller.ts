import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { SuperAdminService } from './superadmin.service';
import { CreateSuperAdminDto } from './dto/create-superadmin.dto';
import { UpdateSuperAdminDto } from './dto/update-superadmin.dto';

@ApiTags('super-admins')
@Controller('super-admins')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new super admin' })
  @ApiResponse({ status: 201, description: 'Super admin created successfully.' })
  create(@Body() dto: CreateSuperAdminDto) {
    return this.superAdminService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all super admins' })
  @ApiResponse({ status: 200, description: 'List of super admins retrieved.' })
  findAll() {
    return this.superAdminService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get super admin by ID' })
  @ApiParam({ name: 'id', description: 'Super admin ID' })
  @ApiResponse({ status: 200, description: 'Super admin retrieved.' })
  findOne(@Param('id') id: string) {
    return this.superAdminService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update super admin by ID' })
  @ApiParam({ name: 'id', description: 'Super admin ID' })
  @ApiResponse({ status: 200, description: 'Super admin updated.' })
  update(@Param('id') id: string, @Body() dto: UpdateSuperAdminDto) {
    return this.superAdminService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete super admin by ID' })
  @ApiParam({ name: 'id', description: 'Super admin ID' })
  @ApiResponse({ status: 200, description: 'Super admin deleted.' })
  remove(@Param('id') id: string) {
    return this.superAdminService.remove(id);
  }
}
