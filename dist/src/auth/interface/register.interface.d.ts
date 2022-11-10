export interface IFullName {
    firstName: string;
    lastName: string;
}
export interface IRegister {
    fullName: IFullName;
    phone: string;
    email: string;
    password: string;
}
export declare enum Role {
    ADMIN = "admin",
    USER = "user"
}
