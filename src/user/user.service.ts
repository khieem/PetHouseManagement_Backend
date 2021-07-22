import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userDb: Repository<User>) {}

	async getAll() {
		return await this.userDb.find();
	}

	async getUser(condition) {
		return await this.userDb.find(condition);
	}

	async create(user: User) {
		const info = await this.userDb.findOne({
			where: [{ phone: user.phone }, { email: user.email }],
		});
		if (info) throw new BadRequestException('Người dùng đã tồn tại');
		return this.userDb.save(user);
	}
}
