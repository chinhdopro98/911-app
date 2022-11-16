import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import "dotenv/config"
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthController } from './auth.controller';
import { Interpreter } from 'src/interpreters/entities/interpreter.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { CaslModule } from 'src/casl/casl.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Interpreter, Customer, Admin]),
    UsersModule,
    PassportModule,
    CaslModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '180s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
