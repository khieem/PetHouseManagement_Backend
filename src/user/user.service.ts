import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userDb: Repository<User>) {}

	async getAll() {
		return await this.userDb.find();
	}

	async GetUserById(id: string, role: string = undefined) {
		if (role) {
			var user = await this.userDb.find({
				where: { role: role, id: id },
			});
			if (user.length > 0) return user;
			throw new HttpException('Không tồn tại', HttpStatus.NOT_FOUND);
		}

		return await this.userDb.findByIds([id]);
	}

	async create(user: User) {
		return await this.userDb.save(user);
	}

	async getUsersByRole(role: 'admin' | 'volunteer' | 'clinic' | 'donator') {
		return this.userDb.find({ where: { role: role } });
	}
}
