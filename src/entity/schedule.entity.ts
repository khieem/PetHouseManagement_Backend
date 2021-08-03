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
	date: 'thứ 3' |'thứ 4' |'thứ 5' |'thứ 6' |'thứ 7' |'thứ 2';

	@ManyToOne(() => User, (user) => user.schedules)
	user: User;

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;
}
