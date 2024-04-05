import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async findAll() {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email })
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  async findOneUser(userId: string){
    const id = Number(userId)
    return await this.userRepository.findOneBy({id})
  }
}