import { Role } from "src/common/interfaces/common.interface";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "uuid",
	})
	userId!: string;

	@Column({
		type: "simple-enum",
		enum: Role,
		default: Role.ADMIN,
	})
	role!: Role;

	@OneToOne(type => User, user => user.admin)
	user!: User;
}