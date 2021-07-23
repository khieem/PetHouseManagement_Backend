import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userDb: Repository<User>) {}

	async getAll() {
		return await this.userDb.find();
	}

	async getUser(condition) {
		return await this.userDb.find(condition);
	}

	async create(user: UserDto) {
		const info = await this.userDb.findOne({
			where: [{ phone: user.phone }, { email: user.email }],
		});
		if (info) throw new BadRequestException('Người dùng đã tồn tại');
		return this.userDb.save(user);
	}

	async update(id: number, user: UserDto) {
		const updataData = {
			phone: user.phone,
			role: user.role,
			name: user.name,
			collab: user.collab,
			gender: user.gender,
			address: user.address,
			email: user.email,
			donation: user.donations,
			schedule: user.schedules,
			report: user.reports,
			appointment: user.appointments,
			pet: user.pet,
			updateAt: new Date()
		};

		if (typeof updataData.phone === 'undefined') {
			delete updataData.phone;
		}
		if (typeof updataData.role === 'undefined') {
			delete updataData.role;
		}
		if (typeof updataData.name === 'undefined') {
			delete updataData.name;
		}
		if (typeof updataData.collab === 'undefined') {
			delete updataData.collab;
		}
		if (typeof updataData.gender === 'undefined') {
			delete updataData.gender;
		}
		if (typeof updataData.address === 'undefined') {
			delete updataData.address;
		}
		if (typeof updataData.email === 'undefined') {
			delete updataData.email;
		}
		if (typeof updataData.donation === 'undefined') {
			delete updataData.donation;
		}
		if (typeof updataData.schedule === 'undefined') {
			delete updataData.schedule;
		}
		if (typeof updataData.report === 'undefined') {
			delete updataData.report;
		}
		if (typeof updataData.appointment === 'undefined') {
			delete updataData.appointment;
		}
		if (typeof updataData.pet === 'undefined') {
			delete updataData.pet;
		}

		return await this.userDb.update({id,}, updataData);
	}

	async removeUser(id: number){ 
		const user = await this.userDb.findOne(id);
		if (!user) throw new NotFoundException();
		return await this.userDb.remove(user);
	}
}
