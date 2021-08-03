import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Schedule } from 'src/entity/schedule.entity';
import { ScheduleService } from './schedule.service';

@UseGuards(JwtAuthGuard)
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

	@Get(':shift')
	async getAllUser(@Param('shift') shift: string) {
		return await this.scheduleService.getByShift(shift);
	}

}
