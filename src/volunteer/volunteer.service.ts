import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Volunteer } from './volunteer.entity';

@Injectable()
export class VolunteerService {
	constructor(
		@InjectRepository(Volunteer) private volunteer_db: Repository<Volunteer>
	) {}

	async get_all() {
		return await this.volunteer_db.find();
	}

	async get_employee_by_id(id) {
		return this.volunteer_db.findByIds([id]);
	}

	async create(volunteer: Volunteer) {
		return await this.volunteer_db.save(volunteer);
	}
}
