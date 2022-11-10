import { MigrationInterface, QueryRunner } from "typeorm"

export class createCommon1668048907554 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TYPE \"common_role_enum\" AS ENUM('ADMIN', 'USER')")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TYPE \"common_role_enum\"")
    }

}
