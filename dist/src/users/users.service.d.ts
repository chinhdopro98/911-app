import { CustomersService } from 'src/customers/customers.service';
import { InterpretersService } from 'src/interpreters/interpreters.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    private readonly customerService;
    private readonly interpreterService;
    constructor(userRepository: Repository<User>, customerService: CustomersService, interpreterService: InterpretersService);
    create(createUserDto: CreateUserDto): Promise<void>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
