import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OK, res } from 'src/constants';
import { Schedule } from 'src/entity/schedule.entity';
import { Repository } from 'typeorm';
import { ScheduleDto } from './dto/schedule.dto';

@Injectable()
export class ScheduleService {
	constructor(
		@InjectRepository(Schedule) private scheduleDb: Repository<Schedule>
	) {}

	/* 
	sáng[
	thứ 2 [user],
	thứ 3 []
	]
	*/

	async getAll(shift=["Sáng", "Chiều", "Cả ngày", "Nghỉ"], date=["2", "3", "4", "5", "6", "7"]) {
		// return await this.scheduleDb.find({ relations: ['user'] });
		let userSchedule = {};
		const result = new Map();
		for (let i in shift) {
			for (let j in date) {
				let index = 0;
				let user = await this.scheduleDb.find({
					relations: ['user'],
					where: {
						shift: String(shift[i]),
						date: String(date[j])
					}
				})
				if (user.length == 0) continue;
				else {
					userSchedule = user;
					index += 1;
				}
			}
			result.set(String(shift[i]), userSchedule);
			userSchedule = new Array();
		}
		return result.get("Sáng");
	}

	async getByShift(shift: string) {
		return await this.scheduleDb.find({
			relations: ['user'],
			where: {
				shift: shift,
			},
		});
	}

	async create(schedule: Schedule) {
		return await this.scheduleDb.save(schedule);
	}

	async update(id: number, updateData: ScheduleDto) {
		let found = await this.scheduleDb.findOne(id);
		let newData = Object.assign(found, updateData);
		return await this.scheduleDb.save(newData);
	}

	async find(condition) {
		const a = await this.scheduleDb.findOne(condition);
		return a.id;
	}
}
