"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableUser1668049612534 = void 0;
class createTableUser1668049612534 {
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE TABLE "user" (
            "id"  uuid NOT NULL DEFAULT uuid_generate_v4(),
            "fullName" json NOT NULL,
            "phone" character varying NOT NULL,
            "email" character varying NOT NULL,
            "password" character varying NOT NULL,
            "avatarPath" character varying NULL,
            "gender" "public"."common_gender_enum" NULL,
            "avatarThumbnailPath" character varying NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
            "updatedAt" TIMESTAMP NULL,
            "deletedAt" TIMESTAMP NULL,
            CONSTRAINT "pk_user" PRIMARY KEY ("id")
        );
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
        DROP TABLE "user";
        `);
    }
}
exports.createTableUser1668049612534 = createTableUser1668049612534;
//# sourceMappingURL=1668049612534-create_table_user.js.map