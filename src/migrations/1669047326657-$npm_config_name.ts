import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1669047326657 implements MigrationInterface {
    name = '$npmConfigName1669047326657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "common_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, CONSTRAINT "PK_7fec8b23c7862968df32e9abeff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "language" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "interpreter_language" ("id" SERIAL NOT NULL, "interpreterUserId" uuid NOT NULL, "languageId" integer NOT NULL, CONSTRAINT "PK_bb8cfe588e495a147152e712985" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."interpreter_role_enum" AS ENUM('ADMIN', 'CUSTOMER', 'INTERPRETER')`);
        await queryRunner.query(`CREATE TABLE "interpreter" ("id" SERIAL NOT NULL, "role" "public"."interpreter_role_enum" NOT NULL DEFAULT 'INTERPRETER', "languages" character varying, "description" character varying NOT NULL, "price" integer NOT NULL, "rating" integer NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "userId" uuid NOT NULL, CONSTRAINT "REL_da76d4bf85dd82f5da59a41cf1" UNIQUE ("userId"), CONSTRAINT "PK_df38d00438c8a2300ce50d022ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."admin_role_enum" AS ENUM('ADMIN', 'CUSTOMER', 'INTERPRETER')`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "userId" uuid NOT NULL, "role" "public"."admin_role_enum" NOT NULL DEFAULT 'ADMIN', CONSTRAINT "REL_f8a889c4362d78f056960ca6da" UNIQUE ("userId"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('FEMALE', 'MALE')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "fullName" json NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "gender" "public"."user_gender_enum", "avatarPath" character varying, "avatarThumbnailPath" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."customer_role_enum" AS ENUM('ADMIN', 'CUSTOMER', 'INTERPRETER')`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "userId" uuid NOT NULL, "role" "public"."customer_role_enum" NOT NULL DEFAULT 'CUSTOMER', CONSTRAINT "REL_3f62b42ed23958b120c235f74d" UNIQUE ("userId"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "interpreter_language" ADD CONSTRAINT "FK_fc4c9d45cbe2317e5543a620c64" FOREIGN KEY ("interpreterUserId") REFERENCES "interpreter"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interpreter_language" ADD CONSTRAINT "FK_f7786fd9dfb307aa40a76a390de" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interpreter" ADD CONSTRAINT "FK_da76d4bf85dd82f5da59a41cf1a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_f8a889c4362d78f056960ca6dad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_3f62b42ed23958b120c235f74df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_3f62b42ed23958b120c235f74df"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_f8a889c4362d78f056960ca6dad"`);
        await queryRunner.query(`ALTER TABLE "interpreter" DROP CONSTRAINT "FK_da76d4bf85dd82f5da59a41cf1a"`);
        await queryRunner.query(`ALTER TABLE "interpreter_language" DROP CONSTRAINT "FK_f7786fd9dfb307aa40a76a390de"`);
        await queryRunner.query(`ALTER TABLE "interpreter_language" DROP CONSTRAINT "FK_fc4c9d45cbe2317e5543a620c64"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TYPE "public"."customer_role_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TYPE "public"."admin_role_enum"`);
        await queryRunner.query(`DROP TABLE "interpreter"`);
        await queryRunner.query(`DROP TYPE "public"."interpreter_role_enum"`);
        await queryRunner.query(`DROP TABLE "interpreter_language"`);
        await queryRunner.query(`DROP TABLE "language"`);
        await queryRunner.query(`DROP TABLE "common_entity"`);
    }

}
