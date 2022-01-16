import {MigrationInterface, QueryRunner} from "typeorm";

export class schemaSync1642354273891 implements MigrationInterface {
    name = 'schemaSync1642354273891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "description" TO "descriptions"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "descriptions" TO "description"`);
    }

}
