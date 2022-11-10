import { BaseEntity } from "typeorm";
import { IFullName, Role } from "src/auth/interface/register.interface";
export declare class User extends BaseEntity {
    id: number;
    fullName: IFullName;
    phone: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    constructor(Partial: Partial<User>);
}
