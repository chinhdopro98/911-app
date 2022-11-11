import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Role } from "src/common/interfaces/common.interface";

export class CreateCustomerDto {

	@IsNotEmpty()
	userId!: string;

	@IsOptional()
	@IsEnum(Role)
	role?: Role;
}
