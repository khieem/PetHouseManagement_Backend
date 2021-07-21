import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/entity/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService {
	constructor(
		@InjectRepository(Schedule) private scheduleDb: Repository<Schedule>
	) {}

	async getAll() {
		return await this.scheduleDb.find();
	}

	async getById(id: string) {
		return await this.scheduleDb.findByIds([id]);
	}

	async create(schedule: Schedule) {
		return await this.scheduleDb.save(schedule);
	}
}
