import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommonEntity extends BaseEntity {

	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
	})
	createdAt!: Date;

	@Column({
		type: "timestamp",
		nullable: true,
		default: null
	})
	updatedAt!: Date;

	@Column({
		type: "timestamp",
		nullable: true,
		default: null
	})
	deletedAt!: Date;
}