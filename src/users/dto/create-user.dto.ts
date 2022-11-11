import { IsEmail, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, MinLength } from "class-validator";
import { IFullName } from "src/auth/interface/register.interface";
import { Gender } from "src/common/interfaces/common.interface";

export class CreateUserDto {

	@IsNotEmpty()
	@IsObject()
	fullName!: IFullName;

	@IsNotEmpty()
	@IsString()
	phone!: string;

	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	password!: string;

	@IsNotEmpty()
	@IsEnum(Gender)
	gender!: Gender;

	@IsOptional()
	avatarPath?: string;

	@IsOptional()
	avatarThumbnailPath?: string;
}
