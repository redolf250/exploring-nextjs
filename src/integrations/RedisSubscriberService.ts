import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisSubscriberService implements OnModuleInit, OnModuleDestroy {
  private subscriber: Redis;

  onModuleInit() {
    this.subscriber = new Redis('redis://localhost:6379');
    this.subscriber.subscribe('notifications', (err, count) => {
      if (err) {
        console.error('Failed to subscribe:', err);
      } else {
        console.log(`Subscribed successfully! Currently subscribed to ${count} channel(s).`);
      }
    });

    // handle messages
    this.subscriber.on('message', (channel, message) => {
      console.log(`Received message from ${channel}:`, JSON.parse(message));
      // You can trigger any NestJS service or logic here
    });
  }

  onModuleDestroy() {
    this.subscriber.quit();
  }
}
