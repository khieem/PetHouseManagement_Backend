import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Appointment } from './appointment.entity';
import { Donation } from './donation.entity';
import { Pet } from './pet.entity';
import { Report } from './report.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text', unique: true })
	phone: string;

	@Column({ type: 'text', nullable: true })
	name: string;

	@Column({ type: 'text', nullable: true })
	sex: number;

	@Column({ type: 'text', nullable: true })
	role: number;

	@Column({ type: 'text', nullable: true })
	address: string;

	@Column({ type: 'text', nullable: true })
	email: string;

	@Column({ type: 'boolean', nullable: true })
	collab: boolean;

	@Column({ type: 'text', nullable: true })
	password: string;

	@OneToMany(() => Donation, (donation) => donation.user)
	donations: Donation[];

	@OneToMany(() => Schedule, (schedule) => schedule.user)
	schedules: Schedule[];

	@OneToMany(() => Report, (report) => report.clinic)
	reports: Report[];

	@OneToMany(() => Appointment, (appointment) => appointment.clinic)
	appointments: Appointment[];

	@OneToMany(() => Pet, (pet) => pet.volunteer)
	pet: Pet;

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;
}
