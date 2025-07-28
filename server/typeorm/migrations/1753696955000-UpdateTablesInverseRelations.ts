import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTablesInverseRelations1753696955000
  implements MigrationInterface
{
  name = 'UpdateTablesInverseRelations1753696955000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "expense_participants"`);
    await queryRunner.query(
      `CREATE TABLE "expense_participants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expense_id" uuid NOT NULL, "participant_id" uuid NOT NULL, "share" numeric(10,2) NOT NULL, CONSTRAINT "PK_8a1f705c9eac906d001be929c2a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_participants" ADD CONSTRAINT "FK_07bc1740755fde8bdbf2f4bf2a7" FOREIGN KEY ("expense_id") REFERENCES "expenses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_participants" ADD CONSTRAINT "FK_49540fca114addb842685c9ebde" FOREIGN KEY ("participant_id") REFERENCES "participants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "expense_participants" DROP CONSTRAINT "FK_49540fca114addb842685c9ebde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_participants" DROP CONSTRAINT "FK_07bc1740755fde8bdbf2f4bf2a7"`,
    );
    await queryRunner.query(`DROP TABLE "expense_participants"`);
  }
}
