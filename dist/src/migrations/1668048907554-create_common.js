"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommon1668048907554 = void 0;
class createCommon1668048907554 {
    async up(queryRunner) {
        await queryRunner.query("CREATE TYPE \"common_role_enum\" AS ENUM('ADMIN', 'USER')");
    }
    async down(queryRunner) {
        await queryRunner.query("DROP TYPE \"common_role_enum\"");
    }
}
exports.createCommon1668048907554 = createCommon1668048907554;
//# sourceMappingURL=1668048907554-create_common.js.map