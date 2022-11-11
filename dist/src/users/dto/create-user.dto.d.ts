import { IFullName } from "src/auth/interface/register.interface";
import { Gender } from "src/common/interfaces/common.interface";
export declare class CreateUserDto {
    fullName: IFullName;
    phone: string;
    email: string;
    password: string;
    gender: Gender;
    avatarPath?: string;
    avatarThumbnailPath?: string;
}
