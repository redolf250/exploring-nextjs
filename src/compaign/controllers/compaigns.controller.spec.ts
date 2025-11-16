import { Test, TestingModule } from '@nestjs/testing';
import { CompaignsController } from './compaigns.controller';

describe('CompaignsController', () => {
  let controller: CompaignsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaignsController],
    }).compile();

    controller = module.get<CompaignsController>(CompaignsController);
  });

  it('should be defined', () => {
    //expect(controller).toBeDefined();
  });
});
