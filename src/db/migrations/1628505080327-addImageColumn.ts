import { MigrationInterface, QueryRunner } from 'typeorm';

export class addImageColumn1628505080327 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('PRAGMA foreign_keys = OFF;');
		await queryRunner.query('ALTER TABLE "report" ADD images text');
		await queryRunner.query('PRAGMA foreign_keys = ON;');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('report', 'images');
	}
}
