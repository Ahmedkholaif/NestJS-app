import {MigrationInterface, QueryRunner} from "typeorm";

export class CoffeeRefactor1642353665634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // migration strategy - apply changes
        await queryRunner.query(`
            ALTER TABLE "coffee" Rename COLUMN "name" TO "title";
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // rollback strategy - revert changes
        await queryRunner.query(`
            ALTER TABLE "coffee" Rename COLUMN "title" TO "name";
            `);
    }

}
