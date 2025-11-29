import { Test, TestingModule } from '@nestjs/testing';
import { KafkaListenerController } from './kafka-listener.controller';

describe('KafkaListenerController', () => {
  let controller: KafkaListenerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KafkaListenerController],
    }).compile();

    controller = module.get<KafkaListenerController>(KafkaListenerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
