import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findAllCustomers(): Promise<User[]>;
    findAllInterpreters(): Promise<User[]>;
}
