import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class diaphuong1628258453668 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'donation',
			new TableColumn({
				name: 'address',
				type: 'text',
				isNullable: true,
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('donation', 'address');
	}
}
