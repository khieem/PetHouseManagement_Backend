import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Appointment } from './appointment.entity';
import { Report } from './report.entity';
import { User } from './user.entity';

@Entity()
export class Pet {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text' })
	avatar: string;

	@Column({ type: 'text' })
	name: string;

	@Column({ type: 'text' })
	type: 'chó' | 'mèo';

	@Column({ type: 'text' })
	color: string;

	@Column({ type: 'text', nullable: true })
	gender: string;

	@Column({ type: 'text', nullable: true })
	location: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@OneToMany(() => Report, (report) => report.pet)
	reports: Report[];

	@OneToMany(() => Appointment, (appointment) => appointment.pet)
	appointments: Appointment[];

	@ManyToOne(() => User, (user) => user.pets)
	volunteer: User;

	@CreateDateColumn()
	createAt: Date;
}
