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
import { AppointmentService } from './appointment.service';
import { CreateAppoinmentDto } from './dto/createAppoinment.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';

@UseGuards(JwtAuthGuard)
@Controller('appointment')
export class AppointmentController {
	constructor(private appointmentService: AppointmentService) {}

	@Get()
	async getAllAppointment() {
		return await this.appointmentService.getAllappointments();
	}

	@Get(':id')
	async getSpecificAppointment(@Param('id') id: number) {
		return await this.appointmentService.getSpecificAppointment(id);
	}

	@Post()
	async makeAppointment(@Body() body: CreateAppoinmentDto) {
		return await this.appointmentService.addAppointment(body);
	}

	@Patch(':id')
	async updateAppointment(
		@Param('id') id: number,
		@Body() body: UpdateAppointmentDto
	) {
		return await this.appointmentService.updateAppointment(id, body);
	}

	@Delete(':id')
	async deleteAppointment(@Param('id') id: number) {
		return await this.appointmentService.deleteAppointment(id);
	}
}
