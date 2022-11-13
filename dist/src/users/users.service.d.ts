import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<{
        id: string;
        fullName: import("../auth/interface/register.interface").IFullName;
        phone: string;
        email: string;
        gender: import("../common/interfaces/common.interface").Gender;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }[]>;
    findOne(id: string): Promise<User>;
}
