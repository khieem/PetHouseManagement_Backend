import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userDb: Repository<User>) {}

	async getAll() {
		return await this.userDb.find({
			relations: ['pet', 'donations', 'schedules', 'reports', 'appointments'],
		});
	}

	async getUser(condition) {
		return await this.userDb.find({
			where: [condition],
			relations: ['pet', 'donations', 'schedules', 'reports', 'appointments'],
		});
	}

	async getOne(condition) {
		return await this.userDb.findOne(condition, {
			relations: ['pet', 'donations', 'schedules', 'reports', 'appointments'],
		});
	}

	async create(user) {
		const info = await this.userDb.findOne({ phone: user.phone });
		if (info) throw new BadRequestException('Người dùng đã tồn tại');
		return this.userDb.save(user);
	}

	async update(id, user) {
		const found = this.userDb.findOne(id);
		if (!found) throw new NotFoundException();
		const update = Object.assign(found, user);
		return await this.userDb.save(update);
	}

	async delete(id) {
		const found = await this.userDb.findOne(id);
		if (!found) throw new NotFoundException();
		return await this.userDb.remove(found);
	}
}
