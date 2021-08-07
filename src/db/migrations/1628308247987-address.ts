import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class address1628308247987 implements MigrationInterface {
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
