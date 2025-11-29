import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CompaignModule } from './compaign/compaign.module';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DigitalSignatureModule } from './digital-signature/digital-signature.module';
import { KafkaListnerController } from './kafka-listner/kafka-listner.controller';
import { KafkaListenerController } from './kafka-listener/kafka-listener.controller';
import { KafkaListenerService } from './kafka-listener/kafka-listener.service';
import { KafkaService } from './integrations/kafka.service';
import databaseConfig from './configs/databaseConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.name'),
        autoLoadEntities: true,
        synchronize: true, // disable in production
      }),
    }),
    UsersModule,
    CompaignModule,
    ProductModule,
    DigitalSignatureModule
  ],
  controllers: [KafkaListnerController, KafkaListenerController],
  providers: [KafkaListenerService, KafkaService],
  exports: [],
})
export class AppModule {}
