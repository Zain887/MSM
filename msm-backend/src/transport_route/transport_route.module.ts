import { Module } from '@nestjs/common';
import { TransportRouteService } from './transport_route.service';
import { TransportRouteController } from './transport_route.controller';

@Module({
  controllers: [TransportRouteController],
  providers: [TransportRouteService],
})
export class TransportRouteModule {}
