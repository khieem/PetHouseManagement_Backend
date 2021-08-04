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
import { KO, res } from 'src/constants';
import { AppointmentService } from './appointment.service';
import { CreateAppoinmentDto } from './dto/createAppoinment.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';

@UseGuards(JwtAuthGuard)
@Controller('appointment')
export class AppointmentController {
	constructor(private appointmentService: AppointmentService) {}

	@Get()
	async getAllAppointment() {
		return res(await this.appointmentService.getAllappointments());
	}

	@Get('/clinic_appointment/:id')
	async getClinicAppointment(@Param('id') clinicId: number) {
		return res(
			await this.appointmentService.getAllappointments({ clinic: clinicId })
		);
	}
	@Get('/clinic/:id')
	async getAppointmentbyClinic(@Param('id') id: number) {
		try {
			return res(await this.appointmentService.getAppointmentbyClinic(id));
		} catch (e) {
			return KO;
		}
	}

	@Get(':id')
	async getSpecificAppointment(@Param('id') id: number) {
		try {
			return res(await this.appointmentService.getSpecificAppointment(id));
		} catch (e) {
			return KO;
		}
	}

	@Post()
	async makeAppointment(@Body() body: CreateAppoinmentDto) {
		return res(await this.appointmentService.addAppointment(body));
	}

	// @Patch(':id')
	// async updateAppointment(
	// 	@Param('id') id: number,
	// 	@Body() body: UpdateAppointmentDto
	// ) {
	// 	return await this.appointmentService.updateAppointment(id, body);
	// }

	@Delete(':id')
	async deleteAppointment(@Param('id') id: number) {
		try {
			return res(await this.appointmentService.deleteAppointment(id));
		} catch (e) {
			return KO;
		}
	}
}
