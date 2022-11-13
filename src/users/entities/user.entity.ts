import { BeforeInsert, BeforeUpdate, Column, Entity, OneToOne } from "typeorm";
import * as bcrypt from 'bcrypt';
import { CommonEntity } from "src/common/entity/common.entity";
import { Gender } from "src/common/interfaces/common.interface";
import { IFullName } from "src/auth/interface/register.interface";
import { Interpreter } from "src/interpreters/entities/interpreter.entity";
import { Customer } from "src/customers/entities/customer.entity";
import { Admin } from "src/admin/entities/admin.entity";

@Entity()
export class User extends CommonEntity {

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
		type: "enum",
		enum: Gender,
		nullable: true,
	})
	gender!: Gender;


	@Column({
		nullable: true,
	})
	avatarPath!: string;

	@Column({
		nullable: true
	})
	avatarThumbnailPath!: string;

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		const salt = await bcrypt.genSalt();
		this.password = await bcrypt.hash(this.password, salt);
	}

	async validatePassword(password: string): Promise<boolean> {
		const isMatch = await bcrypt.compare(password, this.password);
		return isMatch;
	}

	@OneToOne(type => Interpreter, interpreter => interpreter.user)
	interpreter!: Interpreter;

	@OneToOne(type => Customer, customer => customer.user)
	customer!: Customer;

	@OneToOne(type => Admin, admin => admin.user)
	admin!: Admin;

	constructor(Partial: Partial<User>) {
		super();
		Object.assign(this, Partial);
	}
}
