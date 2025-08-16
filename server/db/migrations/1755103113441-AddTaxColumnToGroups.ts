import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaxColumnToGroups1755103113441 implements MigrationInterface {
    name = 'AddTaxColumnToGroups1755103113441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" ADD "tax" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "tax"`);
    }

}
