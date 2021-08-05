import { Injectable } from '@nestjs/common';
import { identity } from 'rxjs';
import { KO, OK } from 'src/constants';
import { ScheduleService } from 'src/schedule/schedule.service';
import { UserService } from 'src/user/user.service';
import { CreateVolDto } from './dto/createVolunteer.dto';
import { UpdateVolDto } from './dto/updateVolunteer.dto';

@Injectable()
export class VolunteerService {
	constructor(
		private userService: UserService,
		private scheduleService: ScheduleService
	) {}

	async getAll() {
		return this.userService.getAll({ role: 'Tình nguyện viên' });
	}

	async getById(id: number) {
		return this.userService.getOne({ id, role: 'Tình nguyện viên' });
	}

	async get(condition) {
		return await this.userService.getOne(condition);
	}
	async create(volunteer: CreateVolDto) {
		return this.userService.create({
			role: 'Tình nguyện viên',
			collab: true,
			password: volunteer.phone,
			...volunteer,
		});
	}

	async update(id: number, dto: UpdateVolDto) {
		return this.userService.update(id, dto);
	}

	async updateSchedule(idx: number, payload) {
		const body = payload.data;
		// body array [{date: 2, shift: sang}, {}, {}...]
		let found = await this.userService.getOne({ id: idx });
		if (!found) return KO;
		else {
			body.forEach(async (s) => {
				const d = s.date;
				for (let i = 0; i < found.schedules.length; ++i) {
					const j = await this.scheduleService.find({ date: d });
					await this.scheduleService.update(j, s);
				}
			});
			return OK;
		}
	}

	async remove(id: number) {
		return await this.userService.removeUser(id);
	}

	// async delete(id: number) {
	// 	return
	// }
}
