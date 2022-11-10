import { IsString, IsEmail, IsNotEmpty, Matches, IsJSON, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IFullName } from '../interface/register.interface';
import { Type } from 'class-transformer';

export class IFullNameDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	lastName: string;
}

export class RegisterDTO {

	@ApiProperty()
	@Type(() => IFullNameDto)
	@IsNotEmpty()
	@IsObject()
	fullName: IFullNameDto;


	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	phone: string;

	@ApiProperty()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty()
	@IsString()
	// @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g, {
	// 	message: 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character',
	// })
	password: string;
}

