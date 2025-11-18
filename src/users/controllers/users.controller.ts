import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserEntity } from '../entities/user.entity';
import { MobileMoneyGateway } from '../../integrations/payments/MobileMoneyGateway';
import { VisaCardGateway } from '../../integrations/payments/VisaCardGateway';
import { randomUUID } from 'node:crypto';


@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get("/all")
  async getAllUsers(){
      return await this.usersService.findAll();
  }

  @Put()
  async makePayment(@Body() body : any) {
    const gateways: Map<string, PaymentGateway> = new Map();
    gateways.set("mtn_momo", new MobileMoneyGateway());
    gateways.set("visa_card", new VisaCardGateway());
    const {gatewayType} = body
    const gateway = gateways.get(gatewayType)
    
    if (!gateway)
      throw new NotFoundException(`Gateway not found ${gatewayType}`);
    gateway.initializePayment()
    gateway.verifyTransaction()

    return {trxId: randomUUID().toString(), message: "Payment was verified."};
  }

  @Post()
  async createUser(@Body() user: Partial<UserEntity>){
    return await this.usersService.createUser(user)
  }
}
