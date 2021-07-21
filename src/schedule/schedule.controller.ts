import { Body, Controller, Get, Post } from '@nestjs/common';
import { Schedule } from 'src/entity/schedule.entity';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
	constructor(private scheduleService: ScheduleService) {}

	@Get()
	async getAllSchedules() {
		return await this.scheduleService.getAll();
	}

	@Post()
	async createSchedule(@Body() schedule: Schedule) {
		return await this.scheduleService.create(schedule);
	}
}
