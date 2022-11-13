import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Role } from "src/common/interfaces/common.interface";
export class CreateInterpreterDto {

	@ApiProperty({
		enum: Role,
		isArray: true,
		example: [Role.INTERPRETER]
	})
	@IsNotEmpty()
	@IsEnum(Role)
	role!: Role;

	@ApiProperty()
	@IsOptional()
	@IsString()
	languages?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	price?: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	rating?: number;

	@ApiProperty()
	@IsOptional()
	@IsBoolean()
	isVerified?: boolean;

	@ApiProperty()
	@IsNotEmpty()
	userId!: string;
}
