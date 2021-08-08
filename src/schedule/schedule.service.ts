/* eslint-disable prefer-const */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KO, OK, res } from 'src/constants';
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

	// tqnguyen tạo function này
	async getSchedule() {
		const scheduleMorning = await this.getByShift('Sáng');
		const scheduleAfternoon = await this.getByShift('Chiều');
		const scheduleEvening = await this.getByShift('Tối');
		const schedule_M_A = await this.getByShift('Sáng & Chiều');
		const schedule_M_E = await this.getByShift('Sáng & Tối');
		const schedule_A_E = await this.getByShift('Chiều & Tối');
		const scheduleAllDay = await this.getByShift('Cả ngày');

		let morning = {
			id: 1,
			shift: 'Sáng',
			mon: [],
			tue: [],
			wed: [],
			thu: [],
			fri: [],
			sat: [],
		};

		let afternoon = {
			id: 2,
			shift: 'Chiều',
			mon: [],
			tue: [],
			wed: [],
			thu: [],
			fri: [],
			sat: [],
		};

		let evening = {
			id: 3,
			shift: 'Tối',
			mon: [],
			tue: [],
			wed: [],
			thu: [],
			fri: [],
			sat: [],
		};

		scheduleMorning.forEach((schedule) => {
			if (schedule.date === '2') morning.mon.push(schedule.user);
			else if (schedule.date === '3') morning.tue.push(schedule.user);
			else if (schedule.date === '4') morning.wed.push(schedule.user);
			else if (schedule.date === '5') morning.thu.push(schedule.user);
			else if (schedule.date === '6') morning.fri.push(schedule.user);
			else if (schedule.date === '7') morning.sat.push(schedule.user);
		});

		scheduleAfternoon.forEach((schedule) => {
			if (schedule.date === '2') afternoon.mon.push(schedule.user);
			else if (schedule.date === '3') afternoon.tue.push(schedule.user);
			else if (schedule.date === '4') afternoon.wed.push(schedule.user);
			else if (schedule.date === '5') afternoon.thu.push(schedule.user);
			else if (schedule.date === '6') afternoon.fri.push(schedule.user);
			else if (schedule.date === '7') afternoon.sat.push(schedule.user);
		});

		scheduleEvening.forEach((schedule) => {
			if (schedule.date === '2') evening.mon.push(schedule.user);
			else if (schedule.date === '3') evening.tue.push(schedule.user);
			else if (schedule.date === '4') evening.wed.push(schedule.user);
			else if (schedule.date === '5') evening.thu.push(schedule.user);
			else if (schedule.date === '6') evening.fri.push(schedule.user);
			else if (schedule.date === '7') evening.sat.push(schedule.user);
		});

		schedule_M_A.forEach((schedule) => {
			if (schedule.date === '2') {
				morning.mon.push(schedule.user);
				afternoon.mon.push(schedule.user);
			} else if (schedule.date === '3') {
				morning.tue.push(schedule.user);
				afternoon.tue.push(schedule.user);
			} else if (schedule.date === '4') {
				morning.wed.push(schedule.user);
				afternoon.wed.push(schedule.user);
			} else if (schedule.date === '5') {
				morning.thu.push(schedule.user);
				afternoon.thu.push(schedule.user);
			} else if (schedule.date === '6') {
				morning.fri.push(schedule.user);
				afternoon.fri.push(schedule.user);
			} else if (schedule.date === '7') {
				morning.sat.push(schedule.user);
				afternoon.sat.push(schedule.user);
			}
		});

		schedule_M_E.forEach((schedule) => {
			if (schedule.date === '2') {
				morning.mon.push(schedule.user);
				evening.mon.push(schedule.user);
			} else if (schedule.date === '3') {
				morning.tue.push(schedule.user);
				evening.tue.push(schedule.user);
			} else if (schedule.date === '4') {
				morning.wed.push(schedule.user);
				evening.wed.push(schedule.user);
			} else if (schedule.date === '5') {
				morning.thu.push(schedule.user);
				evening.thu.push(schedule.user);
			} else if (schedule.date === '6') {
				morning.fri.push(schedule.user);
				evening.fri.push(schedule.user);
			} else if (schedule.date === '7') {
				morning.sat.push(schedule.user);
				evening.sat.push(schedule.user);
			}
		});

		schedule_A_E.forEach((schedule) => {
			if (schedule.date === '2') {
				afternoon.mon.push(schedule.user);
				evening.mon.push(schedule.user);
			} else if (schedule.date === '3') {
				afternoon.tue.push(schedule.user);
				evening.tue.push(schedule.user);
			} else if (schedule.date === '4') {
				afternoon.wed.push(schedule.user);
				evening.wed.push(schedule.user);
			} else if (schedule.date === '5') {
				afternoon.thu.push(schedule.user);
				evening.thu.push(schedule.user);
			} else if (schedule.date === '6') {
				afternoon.fri.push(schedule.user);
				evening.fri.push(schedule.user);
			} else if (schedule.date === '7') {
				afternoon.sat.push(schedule.user);
				evening.sat.push(schedule.user);
			}
		});

		scheduleAllDay.forEach((schedule) => {
			if (schedule.date === '2') {
				morning.mon.push(schedule.user);
				afternoon.mon.push(schedule.user);
				evening.mon.push(schedule.user);
			} else if (schedule.date === '3') {
				morning.tue.push(schedule.user);
				afternoon.tue.push(schedule.user);
				evening.tue.push(schedule.user);
			} else if (schedule.date === '4') {
				morning.wed.push(schedule.user);
				afternoon.wed.push(schedule.user);
				evening.wed.push(schedule.user);
			} else if (schedule.date === '5') {
				morning.thu.push(schedule.user);
				afternoon.thu.push(schedule.user);
				evening.thu.push(schedule.user);
			} else if (schedule.date === '6') {
				morning.fri.push(schedule.user);
				afternoon.fri.push(schedule.user);
				evening.fri.push(schedule.user);
			} else if (schedule.date === '7') {
				morning.sat.push(schedule.user);
				afternoon.sat.push(schedule.user);
				evening.sat.push(schedule.user);
			}
		});

		return [morning, afternoon, evening];
	}
}
