import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDTO } from './dto/register-dto';

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
}
