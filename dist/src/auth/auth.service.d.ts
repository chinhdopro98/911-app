import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { IJwtPayload } from './interface/jwt-payload.interface';
import { ILogin } from './interface/login.interface';
import { IRegister } from './interface/register.interface';
import { Customer } from 'src/customers/entities/customer.entity';
import { Interpreter } from 'src/interpreters/entities/interpreter.entity';
import { Admin } from 'src/admin/entities/admin.entity';
export declare class AuthService {
    private readonly userRepository;
    private readonly customerRepository;
    private readonly interpreterRepository;
    private readonly adminRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, customerRepository: Repository<Customer>, interpreterRepository: Repository<Interpreter>, adminRepository: Repository<Admin>, jwtService: JwtService);
    login(payload: ILogin): Promise<{
        status: HttpStatus;
        content: string;
        data: User;
        accessToken: string;
    }>;
    loginWithAdmin(payload: ILogin): Promise<{
        status: HttpStatus;
        content: string;
        data: User;
        accessToken: string;
    }>;
    exitsEmail(email: string): Promise<boolean>;
    exitsPhone(phone: string): Promise<boolean>;
    isAdmin(userId: string): Promise<boolean>;
    register(payload: IRegister): Promise<{
        status: HttpStatus;
        content: string;
    }>;
    registerWithAdmin(payload: IRegister): Promise<{
        status: HttpStatus;
        content: string;
    }>;
    validateUser(payload: IJwtPayload): Promise<User>;
}
