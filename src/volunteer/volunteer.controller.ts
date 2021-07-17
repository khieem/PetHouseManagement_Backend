import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Volunteer } from './volunteer.entity';
import { VolunteerService } from './volunteer.service';

@Controller('volunteer')
export class VolunteerController {
	constructor(private volunteer_service: VolunteerService) {}

	@Get()
	get_all_volunteer() {
		return this.volunteer_service.get_all();
	}

	@Get(':id')
	get_volunteer(@Param('id') id: string) {
		return this.volunteer_service.get_employee_by_id(id);
	}

	@Post()
	create_volunteer(@Body() volunteer: Volunteer) {
		return this.volunteer_service.create(volunteer);
	}
}
