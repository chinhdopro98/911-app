import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, MinLength } from "class-validator";
import { IFullNameDto } from "src/auth/dto/register-dto";
import { IFullName } from "src/auth/interface/register.interface";
import { Gender } from "src/common/interfaces/common.interface";

export class CreateUserDto {

	@ApiProperty()
	@IsNotEmpty()
	@Type(() => IFullNameDto)
	@IsObject()
	fullName!: IFullName;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	phone!: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	password!: string;

	@ApiProperty({
		enum: Gender,
		isArray: true,
		example: [Gender.FEMALE, Gender.MALE]
	})
	gender!: Gender;

	@ApiProperty()
	@IsOptional()
	avatarPath?: string;

	@ApiProperty()
	@IsOptional()
	avatarThumbnailPath?: string;
}
