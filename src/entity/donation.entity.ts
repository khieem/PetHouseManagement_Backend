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

	@Column({ type: 'float' })
	amount: number;

	@ManyToOne(() => User, (user) => user.donations, { eager: true })
	donator: User;

	@CreateDateColumn()
	createAt: Date;
}
