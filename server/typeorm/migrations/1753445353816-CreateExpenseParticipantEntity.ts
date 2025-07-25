import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExpenseParticipantEntity1753445353816 implements MigrationInterface {
    name = 'CreateExpenseParticipantEntity1753445353816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense_participant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expense_id" uuid NOT NULL, "participant_id" uuid NOT NULL, "share" numeric(10,2) NOT NULL, CONSTRAINT "PK_5a27328bd5ba66890f881d5a353" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "expense_participant" ADD CONSTRAINT "FK_feab6d1335eed1f0b81e4758ce3" FOREIGN KEY ("expense_id") REFERENCES "expenses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expense_participant" ADD CONSTRAINT "FK_6e556304a4fd53501b574fcc143" FOREIGN KEY ("participant_id") REFERENCES "participants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense_participant" DROP CONSTRAINT "FK_6e556304a4fd53501b574fcc143"`);
        await queryRunner.query(`ALTER TABLE "expense_participant" DROP CONSTRAINT "FK_feab6d1335eed1f0b81e4758ce3"`);
        await queryRunner.query(`DROP TABLE "expense_participant"`);
    }

}
