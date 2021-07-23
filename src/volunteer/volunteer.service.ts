import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class VolunteerService {
	constructor(private userService: UserService) {}

	async getAll() {
		return this.userService.getUser({ role: 'volunteer' });
	}

	async getById(id) {
		return this.userService.getOne({ id, role: 'volunteer' });
	}

	async create(volunteer) {
		return this.userService.create({
			role: 'volunteer',
			collab: true,
			...volunteer,
		});
	}

	async update(id, dto) {
		return this.userService.update(id, dto);
	}

	async remove(id) {
		console.log('service');
		return this.userService.removeUser(id);
	}
}
