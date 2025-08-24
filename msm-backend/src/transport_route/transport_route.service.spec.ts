import { Test, TestingModule } from '@nestjs/testing';
import { TransportRouteService } from './transport_route.service';

describe('TransportRouteService', () => {
  let service: TransportRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransportRouteService],
    }).compile();

    service = module.get<TransportRouteService>(TransportRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
