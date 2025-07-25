import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGroupEntity1753440494758 implements MigrationInterface {
    name = 'CreateGroupEntity1753440494758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client_id" uuid NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_946d786babc7f7aad541de1e972" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_946d786babc7f7aad541de1e972"`);
        await queryRunner.query(`DROP TABLE "groups"`);
    }

}
