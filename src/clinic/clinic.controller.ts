import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Controller('clinic')
export class ClinicController {
	constructor(private userService: UserService) {}

	@Get()
	async getAllClinics() {
		return await this.userService.getUser({ role: 'clinic' });
	}

	@Get(':id')
	async getClinicById(@Param('id') id: string) {
		return this.userService.getUser({ id, role: 'clinic' });
	}

	@Post()
	createNewClinic(@Body() clinic: User) {
		return this.userService.create(clinic);
	}
}
