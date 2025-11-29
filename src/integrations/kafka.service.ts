import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka;
  private producer: Producer;

  onModuleInit() {
    this.kafka = new Kafka({
      brokers: ['localhost:9092'],
    });

    this.producer = this.kafka.producer();
    this.producer.connect().then(r => {
      console.log(`Connected to Kafka: ${r}`);
    });
  }

  async publish(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });

    console.log('Message sent to Kafka:', message);
  }
}

