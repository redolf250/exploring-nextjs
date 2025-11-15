import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>;

    async findAll(): Promise<UserEntity[]> {
      return await this.usersRepository.find();
    }

    async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
      return await this.usersRepository.save(user)
    }
}
