import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateResourceTable1742761857858 implements MigrationInterface {
  name = 'UpdateResourceTable1742761857858';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "resource" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "resource" ADD CONSTRAINT "FK_77a300816e77fa9fdca6879c4d1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "resource" DROP CONSTRAINT "FK_77a300816e77fa9fdca6879c4d1"`,
    );
    await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "userId"`);
  }
}
