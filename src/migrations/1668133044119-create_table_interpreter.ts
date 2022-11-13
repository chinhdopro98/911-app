import { MigrationInterface, QueryRunner } from "typeorm"

export class createTableInterpreter1668133044119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "interpreter" (
            "id" SERIAL PRIMARY KEY,
            "role" "public"."role_enum" NOT NULL DEFAULT 'INTERPRETER',
            "languages" json NOT NULL,
            "description" character varying NOT NULL,
            "price" integer NOT NULL,
            "rating" integer NOT NULL,
            "isVerified" boolean NOT NULL DEFAULT false,
            "userId" uuid NOT NULL,
            constraint "customer_userId_fkey" foreign key ("userId") references "user" ("id")
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP tABLE "interpreter"`);
    }

}
