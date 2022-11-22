import { Module } from '@nestjs/common';
import { InterpreterlanguageService } from './interpreterlanguage.service';
import { InterpreterlanguageController } from './interpreterlanguage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterpreterLanguage } from './entities/interpreterlanguage.entity';
import { Interpreter } from 'src/interpreters/entities/interpreter.entity';
import { Language } from 'src/languages/entities/language.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InterpreterLanguage,
      Interpreter,
      Language,
      User,
    ]),
  ],
  controllers: [InterpreterlanguageController],
  providers: [InterpreterlanguageService],
})
export class InterpreterlanguageModule {}
