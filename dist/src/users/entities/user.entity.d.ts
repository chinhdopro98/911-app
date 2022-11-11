import { CommonEntity } from "src/common/entity/common.entity";
import { Gender } from "src/common/interfaces/common.interface";
import { IFullName } from "src/auth/interface/register.interface";
import { Interpreter } from "src/interpreters/entities/interpreter.entity";
import { Customer } from "src/customers/entities/customer.entity";
export declare class User extends CommonEntity {
    fullName: IFullName;
    phone: string;
    email: string;
    password: string;
    gender: Gender;
    avatarPath: string;
    avatarThumbnailPath: string;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    interpreter: Interpreter;
    customer: Customer;
    constructor(Partial: Partial<User>);
}
