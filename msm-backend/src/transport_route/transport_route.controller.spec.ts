import { Test, TestingModule } from '@nestjs/testing';
import { TransportRouteController } from './transport_route.controller';
import { TransportRouteService } from './transport_route.service';

describe('TransportRouteController', () => {
  let controller: TransportRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportRouteController],
      providers: [TransportRouteService],
    }).compile();

    controller = module.get<TransportRouteController>(TransportRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
