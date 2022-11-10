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

export enum Role {
	ADMIN = 'admin',
	USER = 'user',
}