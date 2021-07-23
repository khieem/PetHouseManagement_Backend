import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/entity/user.entity';
// import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
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
	async getVolunteerById(@Param('id') id: string) {
		return await this.volunteerService.getById(id);
	}

	@Post()
	async createNewVolunteer(@Body() volunteer: User) {
		return this.volunteerService.create(volunteer);
	}

	@Patch(':id')
	async updateVolunteer(@Param('id') id: number, @Body() updateData) {
		return await this.volunteerService.update(id, updateData);
	}

	@Delete(':id')
	async removeVolunteer(@Param('id') id) {
		console.log('controller');
		return await this.volunteerService.remove(id);
	}
}
