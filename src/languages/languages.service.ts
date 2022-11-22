import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async findAll() {
    return await this.languageRepository.find();
  }

  async findOne(id: number) {
    const language = await this.languageRepository.findOne({
      where: { id },
    });
    return language;
  }
  async remove(id: number) {
    await this.languageRepository
      .createQueryBuilder('language')
      .delete()
      .where('id = :id', { id })
      .execute();
    return { message: 'Deleted successfully' };
  }
  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    await this.languageRepository
      .createQueryBuilder('language')
      .update(Language)
      .set(updateLanguageDto)
      .where('id = :id', { id: id })
      .execute();

    const languageUpdated = await this.languageRepository.findOne({
      where: { id },
    });

    return {
      status: HttpStatus.OK,
      message: `Language ${languageUpdated} updated successfully`,
    };
  }
  async create(createLanguageDto: CreateLanguageDto) {
    const { name, type } = createLanguageDto;

    const language = await this.languageRepository.create({
      name,
      type,
    });

    return await this.languageRepository.save(language);
  }
}
