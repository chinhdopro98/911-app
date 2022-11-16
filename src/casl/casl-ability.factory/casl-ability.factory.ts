import { Ability, MongoAbility, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/admin/entities/admin.entity";
import { Action } from "src/common/interfaces/common.interface";
import { Customer } from "src/customers/entities/customer.entity";
import { Interpreter } from "src/interpreters/entities/interpreter.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

type Subjects = InferSubjects<typeof Admin | typeof User | typeof Customer | typeof Interpreter>
	| 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {

	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) { }

	async createForUser(user: User) {
		const userRep = await this.userRepository.findOne({
			where: {
				id: user.id
			},
			relations: ['admin', 'customer', 'interpreter']
		});
		const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>)

		if (userRep.admin !== null) {
			can(Action.MANAGE, 'all');
		} else {
			cannot(Action.MANAGE, 'all');
		}

		return build({
			detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
		});
	}
}