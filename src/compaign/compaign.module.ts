import { Module } from '@nestjs/common';
import { CompaignsService } from './services/compaigns.service';
import { CompaignsController } from './controllers/compaigns.controller';
import { CompaignEntity } from './entities/compaign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CompaignEntity])],
  providers: [CompaignsService],
  controllers: [CompaignsController]
})
export class CompaignModule {}
