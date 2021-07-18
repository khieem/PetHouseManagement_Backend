import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Schedule {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text', nullable: true })
	shift: string;

	@Column({ type: 'datetime', nullable: true })
	date: Date;

	@ManyToOne(() => User, (user) => user.schedules)
	user: User;

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;
}
