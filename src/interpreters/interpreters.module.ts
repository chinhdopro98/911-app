import { Module } from '@nestjs/common';
import { InterpretersService } from './interpreters.service';
import { InterpretersController } from './interpreters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interpreter } from './entities/interpreter.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Interpreter, User]),
  ],
  controllers: [InterpretersController],
  providers: [InterpretersService],
  exports: [InterpretersService]
})
export class InterpretersModule { }
