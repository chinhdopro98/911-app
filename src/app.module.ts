import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { InterpretersModule } from './interpreters/interpreters.module';
import { CaslModule } from './casl/casl.module';
import { AdminModule } from './admin/admin.module';
import { InterpreterlanguageModule } from './interpreterlanguage/interpreterlanguage.module';
import { LanguagesModule } from './languages/languages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CustomersModule,
    InterpretersModule,
    CaslModule,
    AdminModule,
    LanguagesModule,
    InterpreterlanguageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
