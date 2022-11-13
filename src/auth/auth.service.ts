import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { IJwtPayload } from './interface/jwt-payload.interface';
import { ILogin } from './interface/login.interface';
import { IRegister } from './interface/register.interface';
import { CustomersService } from 'src/customers/customers.service';
import { InterpretersService } from 'src/interpreters/interpreters.service';
import { Role } from 'src/common/interfaces/common.interface';
@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService,
		private readonly customerService: CustomersService,
		private readonly interpreterService: InterpretersService
	) { }

	async login(payload: ILogin) {
		const { email, password } = payload;

		const user = await this.userRepository.findOne({
			where: { email },
			relations: ['customer', 'interpreter']
		});

		const isMatch = await user.validatePassword(password as string);


		if (!isMatch || !user) {
			throw new HttpException('Wrong username or password', 401);
		}

		const jwtPayload: IJwtPayload = { sub: user.id.toString(), email: user.email };

		return {
			status: HttpStatus.OK,
			content: 'Login successful',
			data: user,
			accessToken: this.jwtService.sign(jwtPayload)
		};
	}

	async exitsEmail(email: string): Promise<boolean> {
		const user = await this.userRepository.findOne({
			where: { email }
		});
		return !!user;
	}

	async exitsPhone(phone: string): Promise<boolean> {
		const user = await this.userRepository.findOne({
			where: { phone }
		});
		return !!user;
	}

	async register(payload: IRegister) {
		const { fullName, phone, email, password, role = Role.CUSTOMER } = payload;

		const isEmailExits = await this.exitsEmail(email);

		if (isEmailExits) {
			throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
		}

		const isPhoneExits = await this.exitsPhone(phone);
		if (isPhoneExits) {
			throw new HttpException('Phone already exists', HttpStatus.BAD_REQUEST);
		}

		const user = new User({ fullName, phone, email, password });

		const builder = await this.userRepository.createQueryBuilder("user")
			.insert()
			.into(User)
			.values(user)
			.execute();

		const idBuilder = await builder.identifiers[0].id;

		if (role === "INTERPRETER") {
			await this.interpreterService.create({
				role: Role.INTERPRETER,
				userId: idBuilder
			});
		}

		if (role === "CUSTOMER") {
			await this.customerService.create({
				role: Role.CUSTOMER,
				userId: idBuilder
			});
		}

		return {
			status: HttpStatus.CREATED,
			content: 'Create user successful'
		};
	}

	async validateUser(payload: IJwtPayload) {
		const { email, sub } = payload;
		const user = await this.userRepository.findOne({
			where: {
				email,
				id: sub
			}
		});
		if (!user) {
			throw new HttpException('Invalid token', 401);
		}
		return user;
	}

}