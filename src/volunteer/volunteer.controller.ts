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
import { KO, OK, res } from 'src/constants';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { VolunteerService } from './volunteer.service';

@UseGuards(JwtAuthGuard)
@Controller('volunteer')
export class VolunteerController {
	constructor(
		private volunteerService: VolunteerService,
		private userService: UserService
	) {}

	@Get()
	async getAllVolunteers() {
		return res(await this.volunteerService.getAll());
	}

	@Get('schedule')
	async getUserBySchedule() {
		return res(await this.userService.getAll({ collab: 'true' }, false));
	}

	@Get('schedule/:id')
	async getSpecificUserSchedule(@Param('id') id: number) {
		const found = await this.userService.getOne({ id });
		if (!found) return KO;
		else {
			if (found.collab == false) return KO;
			else return res(found.schedules);
		}
	}

	@Get(':id')
	async getVolunteerById(@Param('id') id: number) {
		const v = await this.volunteerService.getById(id);
		if (!v) return KO;
		else return res(v);
	}

	@Post()
	async createNewVolunteer(@Body() volunteer: User) {
		try {
			await this.volunteerService.create(volunteer);
			return OK;
		} catch (e) {
			return KO;
		}
	}

	@Post('search')
	async find(@Body() condition) {
		const found = await this.volunteerService.get(condition);
		if (!found) return KO;
		else return res(found);
	}

	@Post('schedule/:id')
	async updateSchedule(@Param('id') id: number, @Body() body) {
		return await this.volunteerService.updateSchedule(id, body);
	}

	@Patch(':id')
	async updateVolunteer(@Param('id') id: number, @Body() updateData: any) {
		try {
			console.log(await this.volunteerService.update(id, updateData));
			return OK;
		} catch (e) {
			return KO;
		}
	}

	// @Delete(':id')
	// async removeVolunteer(@Param('id') id: number) {
	// 	return await this.volunteerService.remove(id);
	// }
}
