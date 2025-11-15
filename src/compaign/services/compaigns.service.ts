import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CompaignEntity } from '../entities/compaign.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CompaignsService {

  @InjectRepository(CompaignEntity)
  private readonly compaignRepository: Repository<CompaignEntity>;

  async findAll(): Promise<CompaignEntity[]> {
    return await this.compaignRepository.find();
  }

  async createCompaign(compaign:  Partial<CompaignEntity>): Promise<CompaignEntity> {
      return await this.compaignRepository.save(compaign)
  }
}
