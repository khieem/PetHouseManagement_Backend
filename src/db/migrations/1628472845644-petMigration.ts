import { MigrationInterface, QueryRunner } from 'typeorm';

export class petMigration1628472845644 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('PRAGMA foreign_keys = OFF;');
		await queryRunner.query('ALTER TABLE "pet" ADD gender text');
		await queryRunner.query('ALTER TABLE "pet" ADD location text');
		await queryRunner.query('ALTER TABLE "pet" ADD description text');
		await queryRunner.query('PRAGMA foreign_keys = ON;');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('pet', 'gender');
		await queryRunner.dropColumn('pet', 'location');
		await queryRunner.dropColumn('pet', 'description');
	}
}
