import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';

@UseGuards(JwtAuthGuard)
@Controller('volunteer')
export class VolunteerController {
	constructor(private userService: UserService) {}

	@Get()
	async getAllVolunteers() {
		return this.userService.getUser({ role: 'volunteer' });
	}

	@Get(':id')
	async getVolunteerById(@Param('id') id: string) {
		return await this.userService.getUser({ id, role: 'volunteer' });
	}

	@Post()
	createNewVolunteer(@Body() volunteer: User) {
		if (volunteer.role != 'volunteer')
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: 'Vai trò phải là "volunteer"',
				},
				HttpStatus.BAD_REQUEST
			);

		return this.userService.create(volunteer);
	}
}
