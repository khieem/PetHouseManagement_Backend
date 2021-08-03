import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Pet } from './pet.entity';
import { User } from './user.entity';

@Entity()
export class Appointment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'datetime' })
	date: Date;

	@ManyToOne(() => Pet, (pet) => pet.appointments)
	pet: Pet;

	@ManyToOne(() => User, (clinic) => clinic.appointments)
	clinic: User;
}
