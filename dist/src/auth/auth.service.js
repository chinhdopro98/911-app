"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const common_interface_1 = require("../common/interfaces/common.interface");
const customer_entity_1 = require("../customers/entities/customer.entity");
const interpreter_entity_1 = require("../interpreters/entities/interpreter.entity");
const admin_entity_1 = require("../admin/entities/admin.entity");
let AuthService = class AuthService {
    constructor(userRepository, customerRepository, interpreterRepository, adminRepository, jwtService) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.interpreterRepository = interpreterRepository;
        this.adminRepository = adminRepository;
        this.jwtService = jwtService;
    }
    async login(payload) {
        const { email, password } = payload;
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['customer', 'interpreter']
        });
        const isMatch = await user.validatePassword(password);
        const isAdmin = await this.isAdmin(user.id);
        if (!isMatch || !user || isAdmin) {
            throw new common_1.HttpException('Wrong username or password', 401);
        }
        const jwtPayload = { sub: user.id, email: user.email };
        return {
            status: common_1.HttpStatus.OK,
            content: 'Login successful',
            data: user,
            accessToken: this.jwtService.sign(jwtPayload)
        };
    }
    async loginWithAdmin(payload) {
        const { email, password } = payload;
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['admin']
        });
        const isAdmin = await this.isAdmin(user.id);
        const isMatch = await user.validatePassword(password);
        if (!isMatch || !user || !isAdmin) {
            throw new common_1.HttpException('Wrong username or password', 401);
        }
        const jwtPayload = { sub: user.id, email: user.email };
        return {
            status: common_1.HttpStatus.OK,
            content: 'Login admin successful',
            data: user,
            accessToken: this.jwtService.sign(jwtPayload)
        };
    }
    async exitsEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email }
        });
        return !!user;
    }
    async exitsPhone(phone) {
        const user = await this.userRepository.findOne({
            where: { phone }
        });
        return !!user;
    }
    async isAdmin(userId) {
        const user = await this.adminRepository.findOne({
            where: {
                userId,
                role: common_interface_1.Role.ADMIN
            }
        });
        return !!user;
    }
    async register(payload) {
        const { fullName, phone, email, password, role = common_interface_1.Role.CUSTOMER } = payload;
        const isEmailExits = await this.exitsEmail(email);
        if (isEmailExits) {
            throw new common_1.HttpException('Email already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const isPhoneExits = await this.exitsPhone(phone);
        if (isPhoneExits) {
            throw new common_1.HttpException('Phone already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = new user_entity_1.User({ fullName, phone, email, password });
        const builder = await this.userRepository.createQueryBuilder("user")
            .insert()
            .into(user_entity_1.User)
            .values(user)
            .execute();
        const idBuilder = await builder.identifiers[0].id;
        if (role === "INTERPRETER") {
            await this.interpreterRepository.create({
                role: common_interface_1.Role.INTERPRETER,
                userId: idBuilder
            });
        }
        if (role === "CUSTOMER") {
            await this.customerRepository.create({
                role: common_interface_1.Role.CUSTOMER,
                userId: idBuilder
            });
        }
        return {
            status: common_1.HttpStatus.CREATED,
            content: 'Create user successful'
        };
    }
    async registerWithAdmin(payload) {
        const { fullName, phone, email, password, role = common_interface_1.Role.ADMIN } = payload;
        const isEmailExits = await this.exitsEmail(email);
        if (isEmailExits) {
            throw new common_1.HttpException('Email already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const isPhoneExits = await this.exitsPhone(phone);
        if (isPhoneExits) {
            throw new common_1.HttpException('Phone already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = new user_entity_1.User({ fullName, phone, email, password });
        const builder = await this.userRepository.createQueryBuilder("user")
            .insert()
            .into(user_entity_1.User)
            .values(user)
            .execute();
        const idBuilder = await builder.identifiers[0].id;
        await this.adminRepository.createQueryBuilder("admin")
            .insert()
            .into(admin_entity_1.Admin)
            .values({
            role: common_interface_1.Role.ADMIN,
            userId: idBuilder
        })
            .execute();
        return {
            status: common_1.HttpStatus.CREATED,
            content: 'Create Admin successful'
        };
    }
    async validateUser(payload) {
        const { email, sub } = payload;
        const user = await this.userRepository.findOne({
            where: {
                email,
                id: sub
            }
        });
        if (!user) {
            throw new common_1.HttpException('Invalid token', 401);
        }
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(2, (0, typeorm_1.InjectRepository)(interpreter_entity_1.Interpreter)),
    __param(3, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map