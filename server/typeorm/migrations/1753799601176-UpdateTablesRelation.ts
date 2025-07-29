import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTablesRelation1753799601176 implements MigrationInterface {
  name = 'UpdateTablesRelation1753799601176';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "groups" DROP CONSTRAINT "FK_946d786babc7f7aad541de1e972"`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "client_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" DROP CONSTRAINT "FK_d4e9271763ee685f5d746a4e550"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" DROP CONSTRAINT "FK_aab7e9a857a89a7cb42ef9dad0c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ALTER COLUMN "group_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ALTER COLUMN "paid_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_participants" DROP CONSTRAINT "FK_07bc1740755fde8bdbf2f4bf2a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_participants" DROP CONSTRAINT "FK_49540fca114addb842685c9ebde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_participants" ALTER COLUMN "expense_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_participants" ALTER COLUMN "participant_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "participants" DROP CONSTRAINT "FK_d362e8c1c06f89fbbe0817f6b76"`,
    );
    await queryRunner.query(
      `ALTER TABLE "participants" ALTER COLUMN "group_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ADD CONSTRAINT "FK_946d786babc7f7aad541de1e972" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD CONSTRAINT "FK_d4e9271763ee685f5d746a4e550" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD CONSTRAINT "FK_aab7e9a857a89a7cb42ef9dad0c" FOREIGN KEY ("paid_by") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_participants" ADD CONSTRAINT "FK_07bc1740755fde8bdbf2f4bf2a7" FOREIGN KEY ("expense_id") REFERENCES "expenses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_participants" ADD CONSTRAINT "FK_49540fca114addb842685c9ebde" FOREIGN KEY ("participant_id") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "participants" ADD CONSTRAINT "FK_d362e8c1c06f89fbbe0817f6b76" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "participants" DROP CONSTRAINT "FK_d362e8c1c06f89fbbe0817f6b76"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_participants" DROP CONSTRAINT "FK_49540fca114addb842685c9ebde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_participants" DROP CONSTRAINT "FK_07bc1740755fde8bdbf2f4bf2a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" DROP CONSTRAINT "FK_aab7e9a857a89a7cb42ef9dad0c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" DROP CONSTRAINT "FK_d4e9271763ee685f5d746a4e550"`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" DROP CONSTRAINT "FK_946d786babc7f7aad541de1e972"`,
    );
    await queryRunner.query(
      `ALTER TABLE "participants" ALTER COLUMN "group_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "participants" ADD CONSTRAINT "FK_d362e8c1c06f89fbbe0817f6b76" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_participants" ALTER COLUMN "participant_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_participants" ALTER COLUMN "expense_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_participants" ADD CONSTRAINT "FK_49540fca114addb842685c9ebde" FOREIGN KEY ("participant_id") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "expense_participants" ADD CONSTRAINT "FK_07bc1740755fde8bdbf2f4bf2a7" FOREIGN KEY ("expense_id") REFERENCES "expenses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ALTER COLUMN "paid_by" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ALTER COLUMN "group_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD CONSTRAINT "FK_aab7e9a857a89a7cb42ef9dad0c" FOREIGN KEY ("paid_by") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD CONSTRAINT "FK_d4e9271763ee685f5d746a4e550" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "client_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ADD CONSTRAINT "FK_946d786babc7f7aad541de1e972" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
