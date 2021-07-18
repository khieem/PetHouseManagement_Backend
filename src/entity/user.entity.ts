import { truncate } from 'node:fs';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 10, unique: true })
	phone: string;

	// nhớ có thêm length khi khai báo varchar
	@Column({ type: 'varchar', length: 128 })
	name: string;

	// 0: nam; 1: nữ; 2: khác. typeorm hỗ trợ dạng enum nhưng sqlite thì k hỗ trợ nên đành gán bằng tay vậy :)))
	@Column({ type: 'int', nullable: true })
	sex: number;

	// 0: admin, 1: volunteer, 2: clinic, 3: donator
	@Column({ type: 'int' })
	role: number;

	@Column({ type: 'varchar', length: 128 })
	address: string;

	@Column({ type: 'varchar', length: 128, unique: true })
	email: string;

	@Column({ type: 'boolean' })
	collab: boolean;

	// donator không cần mật khẩU nên để null
	@Column({ type: 'varchar', length: 128, nullable: true })
	password: string;

	// nó sẽ tự quản lý 2 cột này nên chỉ cần gán như này thôi
	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;
}
