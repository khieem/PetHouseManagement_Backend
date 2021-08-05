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
	shift: 'sáng' | 'chiều' | 'cả ngày';

	@Column({ type: 'text', nullable: true })
	date: '3' |'4' |'5' |'6' |'7' |'2';

	@ManyToOne(() => User, (user) => user.schedules)
	user: User;

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;
}
