import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Interpreter } from 'src/interpreters/entities/interpreter.entity';
import { InterpretersModule } from 'src/interpreters/interpreters.module';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Interpreter, Customer]),
    InterpretersModule,
    CustomersModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
