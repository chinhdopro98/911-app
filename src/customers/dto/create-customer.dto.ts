import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Role } from "src/common/interfaces/common.interface";

export class CreateCustomerDto {

	@ApiProperty()
	@IsNotEmpty()
	userId!: string;

	@ApiProperty({
		enum: Role,
		isArray: true,
		example: [Role.CUSTOMER]
	})
	@IsNotEmpty()
	@IsEnum(Role)
	role!: Role;
}
