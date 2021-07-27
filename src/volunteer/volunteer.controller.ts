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
import { VolunteerService } from './volunteer.service';

@UseGuards(JwtAuthGuard)
@Controller('volunteer')
export class VolunteerController {
	constructor(private volunteerService: VolunteerService) {}

	@Get()
	async getAllVolunteers() {
		return res(await this.volunteerService.getAll());
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
