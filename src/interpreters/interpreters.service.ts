import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/common/interfaces/common.interface';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateInterpreterDto } from './dto/create-interpreter.dto';
import { UpdateInterpreterDto } from './dto/update-interpreter.dto';
import { Interpreter } from './entities/interpreter.entity';

@Injectable()
export class InterpretersService {
  constructor(
    @InjectRepository(Interpreter)
    private readonly interpreterRepository: Repository<Interpreter>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createInterpreterDto: CreateInterpreterDto) {
    const {
      role = Role.INTERPRETER,
      languages,
      description,
      price,
      rating,
      isVerified = false,
      userId,
    } = createInterpreterDto;

    const interpreter = await this.interpreterRepository.create({
      role,
      languages,
      description,
      price,
      rating,
      isVerified,
      userId,
    });

    return await this.interpreterRepository.save(interpreter);
  }

  async findAll() {
    const interpreters = await this.userRepository.find({
      relations: ['interpreter'],
    });

    return interpreters;
  }

  async findOne(userId: string) {
    const interpreter = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['interpreter'],
    });

    return interpreter;
  }

  async update(
    userId: string,
    updateInterpreterDto: UpdateInterpreterDto,
    updateUserDto: UpdateUserDto,
  ) {
    await this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .set(updateUserDto)
      .where('id = :id', { id: userId })
      .execute();

    await this.interpreterRepository
      .createQueryBuilder('interpreter')
      .update(Interpreter)
      .set(updateInterpreterDto)
      .where('userId = :userId', { userId })
      .execute();

    const userUpdated = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['interpreter'],
    });

    return {
      status: HttpStatus.OK,
      message: `Interpreter ${userUpdated} updated successfully`,
    };
  }

  async remove(userId: string) {
    await this.interpreterRepository
      .createQueryBuilder('interpreter')

      .delete()
      .where('userId = :userId', { userId })
      .execute();

    await this.userRepository
      .createQueryBuilder('user')
      .delete()
      .where('id = :id', { id: userId })
      .execute();

    return { message: 'Deleted successfully' };
  }
}
