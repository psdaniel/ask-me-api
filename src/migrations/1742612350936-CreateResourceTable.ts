import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateResourceTable1742612350936 implements MigrationInterface {
  name = 'CreateResourceTable1742612350936';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "resource" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "url" character varying, "description" character varying, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "resource"`);
  }
}
