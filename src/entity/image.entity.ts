import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Report } from './report.entity';

@Entity()
export class Image {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text' })
	url: string;

	@ManyToOne(() => Report, (report) => report.images)
	report: Report;
}
