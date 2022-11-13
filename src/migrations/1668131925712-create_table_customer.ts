import { MigrationInterface, QueryRunner } from "typeorm"

export class createTableCustomer1668131925712 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "customer" (
            "id" SERIAL PRIMARY KEY,
            "role" "public"."role_enum" NOT NULL DEFAULT 'CUSTOMER',
            "userId" uuid NOT NULL,
            constraint "customer_userId_fkey" foreign key ("userId") references "user" ("id")
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP tABLE "customer"`);
    }

}
