import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailToParticipants1753687126616 implements MigrationInterface {
    name = 'AddEmailToParticipants1753687126616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" ADD "email" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "participants" DROP COLUMN "email"`);
    }

}
