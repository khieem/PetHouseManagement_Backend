import { Injectable } from '@nestjs/common';
import { identity } from 'rxjs';
import { KO, OK } from 'src/constants';
import { Schedule } from 'src/entity/schedule.entity';
import { ScheduleDto } from 'src/schedule/dto/schedule.dto';
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

	// tqnguyen đã sửa function này, trước đó function này không thể update data nếu đây là 1 user mới
	async updateSchedule(
		_id: number,
		obj: {
			data: {
				date: '2' | '3' | '4' | '5' | '6' | '7';
				shift: 'Sáng' | 'Chiều' | 'Cả ngày' | 'Nghỉ';
			}[];
		}
	) {
		// object nhận từ POST có dạng { data: [{date: 2, shift: sang}, {}, {}...] }

		const found = await this.userService.getOne({ id: _id });
		if (!found) return KO;
		else {
			const body = obj.data;
			body.forEach(async (s: any) => {
				const d = s.date;

				// kiểm tra nếu user là người mới (schedules sẽ = rỗng) => tạo mới schedule
				if (found.schedules.length === 0) {
					const data: any = {
						shift: s.shift,
						date: s.date,
						user: found,
					};
					await this.scheduleService.create(data);
				} else {
					// chỗ này cực lỗi !!!!
					for (let i = 0; i < found.schedules.length; ++i) {
						const j = await this.scheduleService.find({ date: d });
						await this.scheduleService.update(j, s);

						// if (found.schedules[i].date === d) {
						// 	found.schedules[i].shift = s.shift;
						// }
					}
				}
			});
			// await this.userService.delete(idx);
			// await this.userService.create(found);
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
