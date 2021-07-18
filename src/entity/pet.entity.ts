import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Appointment } from './appointment.entity';
import { Report } from './report.entity';

@Entity()
export class Pet {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text', nullable: true })
	name: string;

	@Column({ type: 'text', nullable: true })
	color: string;

	@Column({ type: 'text', nullable: true })
	location: string;

	@OneToMany(() => Report, (report) => report.pet)
	reports: Report[];

	@OneToMany(() => Appointment, (appointment) => appointment.pet)
	appointments: Appointment[];

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
