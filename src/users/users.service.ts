import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }


  async findAll() {
    const users = await this.userRepository.find({
      relations: ['customer', 'interpreter']
    });
    const result = users.map(user => {
      const { id, fullName, phone, email, gender, createdAt, updatedAt, deletedAt } = user;
      return { id, fullName, phone, email, gender, createdAt, updatedAt, deletedAt };
    });
    return result;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['customer', 'interpreter']
    })

    return user;
  }



}
