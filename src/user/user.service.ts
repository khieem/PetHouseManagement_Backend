import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userDb: Repository<User>) {}

	async getAll(condition?: any, getALL = true): Promise<User[]> {
		if (getALL == true)
			return await this.userDb.find({
				where: condition,
				relations: [
					'pets',
					'donations',
					'schedules',
					'reports',
					'appointments',
				],
			});
		else
			return await this.userDb.find({
				where: condition,
				relations: ['schedules'],
			});
	}

	async getOne(condition) {
		return await this.userDb.findOne(condition, {
			relations: ['pets', 'donations', 'schedules', 'reports', 'appointments'],
		});
	}

	async create(user: any): Promise<User> {
		if (!user.phone) throw new BadRequestException();
		const info = await this.userDb.findOne({ phone: user.phone });
		if (info) throw new BadRequestException('Người dùng đã tồn tại');
		return this.userDb.save(user);
	}

	async update(id: number, dto: any): Promise<User> {
		const found = await this.userDb.findOne(id);
		if (!found) throw new NotFoundException();
		const update = Object.assign(found, dto);
		return await this.userDb.save(update);
	}

	async removeUser(id: number): Promise<User> {
		const user = await this.userDb.findOne(id);
		if (!user) throw new NotFoundException();
		return await this.userDb.remove(user);
	}
	async save(a) {
		return await this.userDb.save(a);
	}

	async delete(a) {
		return await this.userDb.delete(a);
	}
}
