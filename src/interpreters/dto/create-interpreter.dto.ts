import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Role } from "src/common/interfaces/common.interface";
export class CreateInterpreterDto {

	@IsNotEmpty()
	@IsEnum(Role)
	role!: Role;

	@IsOptional()
	@IsString()
	languages?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsNumber()
	price?: number;

	@IsOptional()
	@IsNumber()
	rating?: number;

	@IsOptional()
	@IsBoolean()
	isVerified?: boolean;

	@IsNotEmpty()
	userId!: string;
}
