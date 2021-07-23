import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class VolunteerService {
	constructor(private userService: UserService) {}

	async getAll() {
		return this.userService.getAll({ role: 'volunteer' });
	}

	async getById(id: number) {
		return this.userService.getOne({ id, role: 'volunteer' });
	}

	async create(volunteer: any) {
		return this.userService.create({
			role: 'volunteer',
			collab: true,
			...volunteer,
		});
	}

	async update(id: number, dto: any) {
		return this.userService.update(id, dto);
	}

	async remove(id: number) {
		return this.userService.removeUser(id);
	}
}
