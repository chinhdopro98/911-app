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
const customers_service_1 = require("../customers/customers.service");
const interpreters_service_1 = require("../interpreters/interpreters.service");
const common_interface_1 = require("../common/interfaces/common.interface");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, customerService, interpreterService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.customerService = customerService;
        this.interpreterService = interpreterService;
    }
    async login(payload) {
        const { email, password } = payload;
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['customer', 'interpreter']
        });
        const isMatch = await user.validatePassword(password);
        if (!isMatch || !user) {
            throw new common_1.HttpException('Wrong username or password', 401);
        }
        const jwtPayload = { sub: user.id.toString(), email: user.email };
        return {
            status: common_1.HttpStatus.OK,
            content: 'Login successful',
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
            await this.interpreterService.create({
                role: common_interface_1.Role.INTERPRETER,
                userId: idBuilder
            });
        }
        if (role === "CUSTOMER") {
            await this.customerService.create({
                role: common_interface_1.Role.CUSTOMER,
                userId: idBuilder
            });
        }
        return {
            status: common_1.HttpStatus.CREATED,
            content: 'Create user successful'
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
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        customers_service_1.CustomersService,
        interpreters_service_1.InterpretersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map