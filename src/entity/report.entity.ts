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

	@Column({ type: 'float', nullable: true })
	weight: number;

	@Column({ type: 'float', nullable: true })
	age: number;

	@Column({ type: 'datetime', nullable: true })
	date: Date;

	@OneToMany(() => Image, (image) => image.report)
	images: Image[];

	@ManyToOne(() => Pet, (pet) => pet.reports)
	pet: Pet;

	@ManyToOne(() => User, (clinic) => clinic.reports)
	clinic: User;

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;
}
