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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const common_entity_1 = require("../../common/entity/common.entity");
const common_interface_1 = require("../../common/interfaces/common.interface");
const interpreter_entity_1 = require("../../interpreters/entities/interpreter.entity");
const customer_entity_1 = require("../../customers/entities/customer.entity");
const admin_entity_1 = require("../../admin/entities/admin.entity");
let User = class User extends common_entity_1.CommonEntity {
    constructor(Partial) {
        super();
        Object.assign(this, Partial);
    }
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    async validatePassword(password) {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    }
};
__decorate([
    (0, typeorm_1.Column)({
        type: 'json'
    }),
    __metadata("design:type", Object)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: common_interface_1.Gender,
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "avatarPath", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "avatarThumbnailPath", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
__decorate([
    (0, typeorm_1.OneToOne)(type => interpreter_entity_1.Interpreter, interpreter => interpreter.user),
    __metadata("design:type", interpreter_entity_1.Interpreter)
], User.prototype, "interpreter", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => customer_entity_1.Customer, customer => customer.user),
    __metadata("design:type", customer_entity_1.Customer)
], User.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(type => admin_entity_1.Admin, admin => admin.user),
    __metadata("design:type", admin_entity_1.Admin)
], User.prototype, "admin", void 0);
User = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map