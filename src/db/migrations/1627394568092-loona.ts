import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableIndex,
	TableColumn,
	TableForeignKey,
	TableUnique,
} from 'typeorm';

export class loona1627394568092 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		const uniquecons = new TableUnique({ columnNames: ['name'] });
		await queryRunner.createUniqueConstraint('pet', uniquecons);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable('pet');
		const unique = table.uniques.find(
			(fk) => fk.columnNames.indexOf('name') !== -1
		);
		await queryRunner.dropUniqueConstraint('pet', unique);
	}
}
//update1627391389736
