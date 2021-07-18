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
import { Report } from './report.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	// sqlite không quan tâm độ dài của dữ liệu nên không cần khai báo length
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

	// nó sẽ tự quản lý 2 cột này nên chỉ cần gán như này thôi
	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;
}
