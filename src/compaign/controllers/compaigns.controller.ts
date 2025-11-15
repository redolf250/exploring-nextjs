import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompaignsService } from '../services/compaigns.service';
import { CompaignEntity } from '../entities/compaign.entity';

@Controller('compaigns')
export class CompaignsController {

  constructor(private readonly compaignsService: CompaignsService) {}


  @Get()
  async findAll(){
    return await this.compaignsService.findAll();
  }

  @Post()
  async createCompaign(@Body() compain: Partial<CompaignEntity>): Promise<CompaignEntity>{
        console.log("Initiating call to: ", compain.phoneList)
        return await this.compaignsService.createCompaign(compain)
  }
}
