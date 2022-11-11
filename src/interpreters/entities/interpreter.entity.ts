import { Role } from "src/common/interfaces/common.interface";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Interpreter {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "enum",
		enum: Role,
		default: Role.INTERPRETER,
	})
	role: Role;

	@Column()
	languages: string;

	@Column()
	description: string;

	@Column()
	price: number;

	@Column()
	rating: number;

	@Column({
		type: "boolean",
		default: false,
	})
	isVerified: boolean;

	@Column({
		type: "uuid",
	})
	userId: string;

	@OneToOne(type => User, user => user.interpreter)
	@JoinColumn({
		name: "userId",
	})
	user!: User;
}
