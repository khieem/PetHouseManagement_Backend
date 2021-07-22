import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';

@UseGuards(JwtAuthGuard)
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
