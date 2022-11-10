import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { IFullName, Role } from "src/auth/interface/register.interface";

@Entity()
export class User extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		type: 'json'
	})
	fullName!: IFullName;

	@Column()
	phone!: string;

	@Column()
	email!: string;

	@Column()
	password!: string;

	@Column({
		type: 'enum',
		enum: Role,
		default: Role.USER
	})
	role: Role

	@Column({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
	})
	createdAt!: Date;

	@Column({
		default: null
	})
	updatedAt!: Date;

	@BeforeInsert()
	async hashPassword() {
		const salt = await bcrypt.genSalt();
		this.password = await bcrypt.hash(this.password, salt);
	}

	async validatePassword(password: string): Promise<boolean> {
		const isMatch = await bcrypt.compare(password, this.password);

		return isMatch;
	}

	constructor(Partial: Partial<User>) {
		super();
		Object.assign(this, Partial);
	}
}
