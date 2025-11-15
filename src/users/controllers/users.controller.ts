import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserEntity } from '../entities/user.entity';
import { Interceptor } from '../../commons/Interceptor';



@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get("/all")
  async getAllUsers(){
      return await this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() user: Partial<UserEntity>){
    return await this.usersService.createUser(user)
  }
}
