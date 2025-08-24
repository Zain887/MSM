import { PartialType } from '@nestjs/swagger';
import { CreateTransportRouteDto } from './create-transport_route.dto';

export class UpdateTransportRouteDto extends PartialType(CreateTransportRouteDto) {}
