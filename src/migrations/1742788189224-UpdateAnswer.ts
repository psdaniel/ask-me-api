import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateResourceCreatedAt1742788189224
  implements MigrationInterface
{
  name = 'UpdateResourceCreatedAt1742788189224';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "resource" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "resource" ALTER COLUMN "createdAt" DROP DEFAULT`,
    );
  }
}
