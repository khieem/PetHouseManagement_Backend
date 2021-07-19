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

	async GetUserById(id) {
		return this.userDb.findOne(id);
	}

	async create(user: User) {
		return await this.userDb.save(user);
	}
}
