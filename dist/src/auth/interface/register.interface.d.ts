import { Role } from "src/common/interfaces/common.interface";
export interface IFullName {
    firstName: string;
    lastName: string;
}
export interface IRegister {
    fullName: IFullName;
    phone: string;
    email: string;
    password: string;
    role: Role;
}
