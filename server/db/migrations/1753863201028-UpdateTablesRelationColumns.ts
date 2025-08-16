import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTablesRelationColumns1753863201028
  implements MigrationInterface
{
  name = 'UpdateTablesRelationColumns1753863201028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clients" ALTER COLUMN "device_type" TYPE character varying(255);`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ALTER COLUMN "device_name" TYPE character varying(255);`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ALTER COLUMN "os_name" TYPE character varying(255);`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ALTER COLUMN "os_version" TYPE character varying(255);`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ALTER COLUMN "browser_name" TYPE character varying(255);`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ALTER COLUMN "browser_version" TYPE character varying(255);`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ALTER COLUMN "user_agent" TYPE character varying(255);`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ALTER COLUMN "screen_resolution" TYPE character varying(255);`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ALTER COLUMN "language" TYPE character varying(255);`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ALTER COLUMN "timezone" TYPE character varying(255);`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ALTER COLUMN "ip_address" TYPE character varying(255);`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "title" TYPE character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ALTER COLUMN "title" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "groups" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "ip_address"`);
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "ip_address" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "timezone"`);
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "timezone" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "language"`);
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "language" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" DROP COLUMN "screen_resolution"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "screen_resolution" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "user_agent"`);
    await queryRunner.query(`ALTER TABLE "clients" ADD "user_agent" text`);
    await queryRunner.query(
      `ALTER TABLE "clients" DROP COLUMN "browser_version"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "browser_version" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "browser_name"`);
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "browser_name" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "os_version"`);
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "os_version" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "os_name"`);
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "os_name" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "device_name"`);
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "device_name" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "device_type"`);
    await queryRunner.query(
      `ALTER TABLE "clients" ADD "device_type" character varying`,
    );
  }
}
