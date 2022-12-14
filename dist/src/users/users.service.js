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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll() {
        const users = await this.userRepository.find({
            relations: ['customer', 'interpreter']
        });
        if (!users) {
            throw new common_1.HttpException('No user found', common_1.HttpStatus.BAD_REQUEST);
        }
        const result = users.reduce((acc, user) => {
            return (user.customer === null && user.interpreter === null) ? [...acc] : [...acc, user];
        }, []);
        return result;
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['customer', 'interpreter']
        });
        return user;
    }
    async findAllCustomers() {
        const customers = await this.userRepository.find({
            relations: ['customer']
        });
        if (!customers) {
            throw new common_1.HttpException('No customer found', common_1.HttpStatus.BAD_REQUEST);
        }
        const result = customers.map(customer => {
            return customer;
        });
        return result;
    }
    async findAllInterpreters() {
        const interpreters = await this.userRepository.find({
            relations: ['interpreter']
        });
        if (!interpreters) {
            throw new common_1.HttpException('No interpreter found', common_1.HttpStatus.BAD_REQUEST);
        }
        const result = interpreters.map(interpreter => {
            return interpreter;
        });
        return result;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map