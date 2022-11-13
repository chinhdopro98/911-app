"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommon1668048907554 = void 0;
class createCommon1668048907554 {
    async up(queryRunner) {
        await queryRunner.query('DROP TYPE IF EXISTS role_enum_old CASCADE;');
        await queryRunner.query("CREATE TYPE \"role_enum\" AS ENUM('ADMIN', 'CUSTOMER', 'INTERPRETER')");
        await queryRunner.query("CREATE TYPE \"common_gender_enum\" AS ENUM('FEMALE', 'MALE')");
    }
    async down(queryRunner) {
        await queryRunner.query("DROP TYPE \"role_enum\"");
        await queryRunner.query("DROP TYPE \"common_gender_enum\"");
    }
}
exports.createCommon1668048907554 = createCommon1668048907554;
//# sourceMappingURL=1668048907554-create_common.js.map