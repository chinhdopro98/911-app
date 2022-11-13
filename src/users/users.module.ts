import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Interpreter } from 'src/interpreters/entities/interpreter.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { CaslModule } from 'src/casl/casl.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Interpreter, Customer, Admin]),
    CaslModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
