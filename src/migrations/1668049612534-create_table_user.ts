import { MigrationInterface, QueryRunner } from "typeorm"

export class createTableUser1668049612534 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "user" (
            "id" SERIAL PRIMARY KEY,
            "fullName" json NOT NULL,
            "phone" character varying NOT NULL,
            "email" character varying NOT NULL,
            "password" character varying NOT NULL,
            "avatarPath" character varying NULL,
            "gender" common_gender_enum NULL,
            "avatarThumbnailPath" character varying NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
            "updatedAt" TIMESTAMP NULL,
            "deletedAt" TIMESTAMP NULL,
        );
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE "user";
        `)
    }

}
