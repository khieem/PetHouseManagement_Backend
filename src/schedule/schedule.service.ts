import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/entity/schedule.entity';
import { Repository } from 'typeorm';
import { ScheduleDto } from './dto/schedule.dto';

@Injectable()
export class ScheduleService {
	constructor(
		@InjectRepository(Schedule) private scheduleDb: Repository<Schedule>
	) {}

	async getAll() {
		return await this.scheduleDb.find({ relations: ['user'] });
	}

	async getById(id: string) {
		return await this.scheduleDb.findByIds([id], { relations: ['user'] });
	}

	async create(schedule: Schedule) {
		return await this.scheduleDb.save(schedule);
	}

	async updateSchedule(id: number, schedulData: ScheduleDto) {
		const updateData = {
			shift: schedulData.shift,
			date: schedulData.date,
			user: schedulData.user,
		};

		if (updateData.date == null) {
			delete updateData.date;
		}

		if (updateData.shift === 'undefined') {
			delete updateData.shift;
		}

		if (updateData.user == null) {
			delete updateData.user;
		}

		return await this.scheduleDb.update({ id }, updateData);
	}
}
