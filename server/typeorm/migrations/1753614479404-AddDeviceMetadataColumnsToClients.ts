import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeviceMetadataColumnsToClients1753614479404 implements MigrationInterface {
    name = 'AddDeviceMetadataColumnsToClients1753614479404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "device_type" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "device_name" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "os_name" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "os_version" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "browser_name" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "browser_version" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "user_agent" text`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "screen_resolution" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "language" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "timezone" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "ip_address" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "ip_address"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "timezone"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "screen_resolution"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "user_agent"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "browser_version"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "browser_name"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "os_version"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "os_name"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "device_name"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "device_type"`);
    }

}
