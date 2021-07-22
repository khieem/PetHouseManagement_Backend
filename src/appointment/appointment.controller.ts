/*
https://docs.nestjs.com/controllers#controllers
*/

import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Appointment } from 'src/entity/appointment.entity';
import { User } from 'src/entity/user.entity';
import { AppointmentService } from './appointment.service';

@UseGuards(JwtAuthGuard)
@Controller('appointment')
export class AppointmentController {
	constructor(private appointmentService: AppointmentService) {}

	@Get()
	getAllAppointment() {
		return this.appointmentService.getAllappointments();
	}

	@Get(':id')
	getSpecificAppointment(@Param('id') id: number) {
		return this.appointmentService.getSpecificAppointment(id);
	}

	@Post()
	makeAppointment(@Body() appointment: Appointment) {
		return this.appointmentService.addAppointment(appointment);
	}

	@Put(':id')
	updateAppointment(
		@Param('id') id: number,
		@Body('date') date: Date,
		@Body() clinic: User
	) {
		return this.appointmentService.updateAppointment(id, date, clinic);
	}
}
