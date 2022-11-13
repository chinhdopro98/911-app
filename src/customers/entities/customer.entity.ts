import { Role } from "src/common/interfaces/common.interface";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "uuid",
	})
	userId!: string;

	@Column({
		type: "simple-enum",
		enum: Role,
		default: Role.CUSTOMER,
	})
	role!: Role;

	@OneToOne(type => User, user => user.customer)
	@JoinColumn({
		name: "userId",
	})
	user!: User;


}
