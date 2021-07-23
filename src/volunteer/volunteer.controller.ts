import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/entity/user.entity';
import { VolunteerService } from './volunteer.service';

@UseGuards(JwtAuthGuard)
@Controller('volunteer')
export class VolunteerController {
	constructor(private volunteerService: VolunteerService) {}

	@Get()
	async getAllVolunteers() {
		return this.volunteerService.getAll();
	}

	@Get(':id')
	async getVolunteerById(@Param('id') id: number) {
		return await this.volunteerService.getById(id);
	}

	@Post()
	async createNewVolunteer(@Body() volunteer: User) {
		return this.volunteerService.create(volunteer);
	}

	@Patch(':id')
	async updateVolunteer(@Param('id') id: number, @Body() updateData: any) {
		return await this.volunteerService.update(id, updateData);
	}

	@Delete(':id')
	async removeVolunteer(@Param('id') id: number) {
		return await this.volunteerService.remove(id);
	}
}
