import { Body, Controller, Get, Post, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDTO } from './dto/register-dto';
import { JwtGuard } from './guard/jwt.guard';
import { LocalGuard } from './guard/local.guard';
import { PoliciesGuard } from 'src/casl/guard/policy.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) { }

	@Post('login')
	async login(@Body(new ValidationPipe()) payload: LoginDTO) {
		return await this.authService.login(payload);
	}

	@Post('register')
	async register(@Body(new ValidationPipe()) payload: RegisterDTO) {
		return await this.authService.register(payload);
	}

	@Post("/admin/loginWithAdmin")
	async loginWithAdmin(@Body(new ValidationPipe()) payload: LoginDTO) {
		return await this.authService.loginWithAdmin(payload);
	}

	@Post("/admin/registerWithAdmin")
	async registerWithAdmin(@Body(new ValidationPipe()) payload: RegisterDTO) {
		return await this.authService.registerWithAdmin(payload);
	}

}
