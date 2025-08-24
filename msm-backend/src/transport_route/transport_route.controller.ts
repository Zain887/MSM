import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransportRouteService } from './transport_route.service';
import { CreateTransportRouteDto } from './dto/create-transport_route.dto';
import { UpdateTransportRouteDto } from './dto/update-transport_route.dto';

@Controller('transport-route')
export class TransportRouteController {
  constructor(private readonly transportRouteService: TransportRouteService) {}

  @Post()
  create(@Body() createTransportRouteDto: CreateTransportRouteDto) {
    return this.transportRouteService.create(createTransportRouteDto);
  }

  @Get()
  findAll() {
    return this.transportRouteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transportRouteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransportRouteDto: UpdateTransportRouteDto) {
    return this.transportRouteService.update(+id, updateTransportRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transportRouteService.remove(+id);
  }
}
