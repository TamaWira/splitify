import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddParticipantsRelationWithGroups1753694871855
  implements MigrationInterface
{
  name = 'AddParticipantsRelationWithGroups1753694871855';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "participants" ADD CONSTRAINT "FK_d362e8c1c06f89fbbe0817f6b76" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "participants" DROP CONSTRAINT "FK_d362e8c1c06f89fbbe0817f6b76"`,
    );
  }
}
