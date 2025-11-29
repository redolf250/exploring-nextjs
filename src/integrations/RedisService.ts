import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private redis: Redis;

  onModuleInit() {
    this.redis = new Redis('redis://localhost:6379');
    // this.redis = new Redis({
    //   host: 'my-redis-host',
    //   port: 6379,
    //   password: 'mypassword',
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    // });
  }

  async publish(channel: string, message: any) {
    await this.redis.publish(channel, JSON.stringify(message));
  }

  async set(key: string, value: any) {
    await this.redis.set(key, JSON.stringify(value));
  }

  async setEx(key: string, expirationTime: number, value: any) {
    await this.redis.setex(key, expirationTime, JSON.stringify(value));
  }

  async get(key: string) {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }
}
