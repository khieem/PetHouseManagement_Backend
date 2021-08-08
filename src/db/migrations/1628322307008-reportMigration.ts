import { query } from 'express';
import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	Connection,
	getConnection,
} from 'typeorm';

export class reportMigration1628322307008 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query('PRAGMA foreign_keys = OFF;');
		await queryRunner.query('ALTER TABLE "report" ADD weight text');
		await queryRunner.query('ALTER TABLE "report" ADD overall text');
		await queryRunner.query('ALTER TABLE "report" ADD allergies text');
		await queryRunner.query('ALTER TABLE "report" ADD vaccines text');
		await queryRunner.query('ALTER TABLE "report" ADD surgeries text');
		await queryRunner.query('ALTER TABLE "report" ADD diagnosis text');
		await queryRunner.query('ALTER TABLE "report" ADD prescription text');
		await queryRunner.query('PRAGMA foreign_keys = ON;');
	}
	async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query('ALTER TABLE "report" DROP weight');
		await queryRunner.query('ALTER TABLE "report" DROP overall');
		await queryRunner.query('ALTER TABLE "report" DROP allergies');
		await queryRunner.query('ALTER TABLE "report" DROP vaccines');
		await queryRunner.query('ALTER TABLE "report" DROP surgeries');
		await queryRunner.query('ALTER TABLE "report" DROP diagnosis');
		await queryRunner.query('ALTER TABLE "report" DROP prescription');
	}
}
