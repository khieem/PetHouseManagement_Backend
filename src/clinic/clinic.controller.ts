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
		return await this.userService.getUsersByRole('clinic');
	}

	@Get(':id')
	async getClinicById(@Param('id') id: string) {
		return this.userService.GetUserById(id, 'clinic');
	}

	@Post()
	createNewClinic(@Body() clinic: User) {
		if (clinic.role != 'clinic')
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: 'Vai trò phải là "clinic"',
				},
				HttpStatus.BAD_REQUEST
			);

		return this.userService.create(clinic);
	}
}
