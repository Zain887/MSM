import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FeeService } from './fee.service';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { Fee } from './entities/fee.entity';

@ApiTags('fees')
@Controller('fees')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new fee record' })
  create(@Body() dto: CreateFeeDto): Promise<Fee> {
    return this.feeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all fee records' })
  findAll(): Promise<Fee[]> {
    return this.feeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a fee record by ID' })
  findOne(@Param('id') id: string): Promise<Fee> {
    return this.feeService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a fee record by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateFeeDto): Promise<Fee> {
    return this.feeService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a fee record by ID' })
  remove(@Param('id') id: string): Promise<void> {
    return this.feeService.remove(id);
  }
}
