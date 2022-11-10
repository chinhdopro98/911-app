import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { IJwtPayload } from './interface/jwt-payload.interface';
import { ILogin } from './interface/login.interface';
import { IRegister } from './interface/register.interface';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    login(payload: ILogin): Promise<{
        status: HttpStatus;
        content: string;
        accessToken: string;
    }>;
    exitsEmail(email: string): Promise<boolean>;
    exitsPhone(phone: string): Promise<boolean>;
    register(payload: IRegister): Promise<{
        status: HttpStatus;
        content: string;
    }>;
    validateUser(payload: IJwtPayload): Promise<User>;
}
