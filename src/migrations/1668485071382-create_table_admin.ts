import { MigrationInterface, QueryRunner } from "typeorm"

export class createTableAdmin1668485071382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "userId" uuid NOT NULL, "role" "role_enum" NOT NULL DEFAULT 'ADMIN', CONSTRAINT "PK_2e9d9e9a9f5f5a5d5c5d5e2f5a5" PRIMARY KEY ("id"))`)
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_5a5a5d5c5d5e2f5a5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admin"`)
    }

}
