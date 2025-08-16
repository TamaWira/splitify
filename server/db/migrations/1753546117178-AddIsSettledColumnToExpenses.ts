import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsSettledColumnToExpenses1753546117178
  implements MigrationInterface
{
  name = 'AddIsSettledColumnToExpenses1753546117178';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD "is_settled" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "is_settled"`);
  }
}
