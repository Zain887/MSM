import { Injectable } from '@nestjs/common';
import { CreateTransportRouteDto } from './dto/create-transport_route.dto';
import { UpdateTransportRouteDto } from './dto/update-transport_route.dto';

@Injectable()
export class TransportRouteService {
  create(createTransportRouteDto: CreateTransportRouteDto) {
    return 'This action adds a new transportRoute';
  }

  findAll() {
    return `This action returns all transportRoute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transportRoute`;
  }

  update(id: number, updateTransportRouteDto: UpdateTransportRouteDto) {
    return `This action updates a #${id} transportRoute`;
  }

  remove(id: number) {
    return `This action removes a #${id} transportRoute`;
  }
}
