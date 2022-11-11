import { MigrationInterface, QueryRunner } from "typeorm"

export class createTableInterpreter1668133044119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "interpreter" (
            "id" SERIAL PRIMARY KEY,
            "userId" uuid NOT NULL,
            "role" common_role_enum NOT NULL DEFAULT 'INTERPRETER',
            "languages" json NOT NULL,
            "description" character varying NOT NULL,
            "price" integer NOT NULL,
            "rating" integer NOT NULL,
            "isVerified" boolean NOT NULL DEFAULT false,
            constraints "FK_interpreter_user" foreign key ("userId") references "user" ("id")
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP tABLE "interpreter"`);
    }

}
