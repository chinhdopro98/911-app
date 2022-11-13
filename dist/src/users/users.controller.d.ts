import { UsersService } from './users.service';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        id: string;
        fullName: import("../auth/interface/register.interface").IFullName;
        phone: string;
        email: string;
        gender: import("src/common/interfaces/common.interface").Gender;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }[]>;
    findOne(id: string): Promise<User>;
}
