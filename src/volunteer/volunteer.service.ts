import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateVolDto } from './dto/createVolunteer.dto';
import { UpdateVolDto } from './dto/updateVolunteer.dto';

@Injectable()
export class VolunteerService {
	constructor(private userService: UserService) {}

	async getAll() {
		return this.userService.getAll({ role: 'tình nguyện viên' });
	}

	async getById(id: number) {
		return this.userService.getOne({ id, role: 'tình nguyện viên' });
	}

	async create(volunteer: CreateVolDto) {
		return this.userService.create({
			role: 'tình nguyện viên',
			collab: true,
			password: volunteer.phone,
			...volunteer,
		});
	}

	async update(id: number, dto: UpdateVolDto) {
		return this.userService.update(id, dto);
	}

	async remove(id: number) {
		return this.userService.removeUser(id);
	}
}
