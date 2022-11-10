import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigServiceService } from './database-config-service.service';
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useClass: DatabaseConfigServiceService,
		})
	],
	providers: [DatabaseConfigServiceService],
	exports: [TypeOrmModule]
})
export class DatabaseModule { }
