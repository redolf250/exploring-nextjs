import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class KafkaListenerController {
  @MessagePattern('user-created')   // Kafka topic name
  handleUserCreated(@Payload() message: any) {
    console.log('Received from Kafka:', message);
  }
}
