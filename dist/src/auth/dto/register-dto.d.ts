import { Role } from 'src/common/interfaces/common.interface';
export declare class IFullNameDto {
    firstName: string;
    lastName: string;
}
export declare class RegisterDTO {
    fullName: IFullNameDto;
    phone: string;
    email: string;
    password: string;
    role: Role;
}
