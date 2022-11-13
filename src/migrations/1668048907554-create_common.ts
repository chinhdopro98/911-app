import { MigrationInterface, QueryRunner } from "typeorm"

export class createCommon1668048907554 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TYPE IF EXISTS role_enum_old CASCADE;');
        await queryRunner.query("CREATE TYPE \"role_enum\" AS ENUM('ADMIN', 'CUSTOMER', 'INTERPRETER')")
        await queryRunner.query("CREATE TYPE \"common_gender_enum\" AS ENUM('FEMALE', 'MALE')")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TYPE \"role_enum\"")
        await queryRunner.query("DROP TYPE \"common_gender_enum\"")
    }

}
