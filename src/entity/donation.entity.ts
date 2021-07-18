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
export class Donation {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'float', nullable: true })
	amount: number;

	@Column({ type: 'datetime', nullable: true })
	date: Date;

	@ManyToOne(() => User, (user) => user.donations)
	user: User;

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;
}
