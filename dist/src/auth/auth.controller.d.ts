import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-dto';
import { RegisterDTO } from './dto/register-dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(payload: LoginDTO): Promise<{
        status: import("@nestjs/common").HttpStatus;
        content: string;
        data: import("../users/entities/user.entity").User;
        accessToken: string;
    }>;
    register(payload: RegisterDTO): Promise<{
        status: import("@nestjs/common").HttpStatus;
        content: string;
    }>;
}
