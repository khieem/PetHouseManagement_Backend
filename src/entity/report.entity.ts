import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Image } from './image.entity';
import { Pet } from './pet.entity';
import { User } from './user.entity';

@Entity()
export class Report {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text' })
	note: string;

	// @OneToMany(() => Image, (image) => image.report, { eager: true })
	// images: Image[];

	@ManyToOne(() => Pet, (pet) => pet.reports)
	pet: Pet;

	@ManyToOne(() => User, (clinic) => clinic.reports, { eager: true })
	clinic: User;

	@CreateDateColumn()
	createAt: Date;

	@Column({ type: 'text', nullable: true })
	weight: string;

	@Column({ type: 'text', nullable: true })
	overall: string;

	@Column({ type: 'text', nullable: true })
	allergies: string;

	@Column({ type: 'text', nullable: true })
	vaccines: string;

	@Column({ type: 'text', nullable: true })
	surgeries: string;

	@Column({ type: 'text', nullable: true })
	diagnosis: string;

	@Column({ type: 'text', nullable: true })
	prescription: string;

	@Column({ type: 'text', nullable: true })
	images: string;
}
