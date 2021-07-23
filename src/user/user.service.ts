import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userDb: Repository<User>) {}

	async getAll(): Promise<User[]> {
		return await this.userDb.find();
	}

	async getUser(condition): Promise<User[]> {
		return await this.userDb.find(condition);
	}

	async getOne(condition): Promise<User> {
		const found = await this.userDb.findOne(condition);
		if (!found) throw new NotFoundException();
		return found;
	}

	async create(user): Promise<User> {
		if (!user.phone) throw new BadRequestException();
		const info = await this.userDb.findOne({
			where: [{ phone: user.phone }, { email: user.email }],
		});
		if (info) throw new BadRequestException('Người dùng đã tồn tại');
		return this.userDb.save(user);
	}

	async update(id: number, dto): Promise<User> {
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
}
