import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Volunteer {
	@PrimaryColumn()
	id: string;

	@Column()
	name: string;
}
