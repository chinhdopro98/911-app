import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateInterpreterlanguageDto } from './dto/create-interpreterlanguage.dto';
import { UpdateInterpreterlanguageDto } from './dto/update-interpreterlanguage.dto';
import { InterpreterLanguage } from './entities/interpreterlanguage.entity';

@Injectable()
export class InterpreterlanguageService {
  constructor(
    @InjectRepository(InterpreterLanguage)
    private readonly interpreterLanguageRepository: Repository<InterpreterLanguage>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createInterpreterlanguageDto: CreateInterpreterlanguageDto) {
    return 'This action adds a new interpreterlanguage';
  }

  async findAll() {
    return await this.interpreterLanguageRepository.find({
      relations: ['interpreter', 'language'],
    });
  }

  async findOneLanguage(id: number) {
    const languages = await this.interpreterLanguageRepository.find({
      where: {
        languageId: id,
      },
      relations: ['language', 'interpreter'],
    });
    return languages.map(async (language) => {
      return await this.userRepository.findOne({
        where: {
          id: language.interpreter.userId,
        },
      });
    });
  }

  async findOneInterpreter(id: string) {
    const languages = await this.interpreterLanguageRepository.find({
      where: {
        interpreterUserId: id,
      },
      relations: ['language', 'interpreter'],
    });
    return languages;
  }

  update(
    id: number,
    updateInterpreterlanguageDto: UpdateInterpreterlanguageDto,
  ) {
    return `This action updates a #${id} interpreterlanguage`;
  }

  remove(id: number) {
    return `This action removes a #${id} interpreterlanguage`;
  }
}
