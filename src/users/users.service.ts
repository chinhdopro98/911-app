import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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


    if (!users) {
      throw new HttpException('No user found', HttpStatus.BAD_REQUEST);
    }

    const result = users.reduce((acc, user) => {
      return (user.customer === null && user.interpreter === null) ? [...acc] : [...acc, user];
    }, [] as User[])

    return result;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['customer', 'interpreter']
    })

    return user;
  }

  async findAllCustomers() {
    const customers = await this.userRepository.find({
      relations: ['customer']
    });

    if (!customers) {
      throw new HttpException('No customer found', HttpStatus.BAD_REQUEST);
    }

    const result = customers.map(customer => {
      return customer;
    });

    return result;
  }

  async findAllInterpreters() {
    const interpreters = await this.userRepository.find({
      relations: ['interpreter']
    });

    if (!interpreters) {
      throw new HttpException('No interpreter found', HttpStatus.BAD_REQUEST);
    }

    const result = interpreters.map(interpreter => {
      return interpreter;
    });

    return result;
  }



}
