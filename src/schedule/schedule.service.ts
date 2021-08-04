import { Injectable, NotFoundException } from '@nestjs/common';
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
