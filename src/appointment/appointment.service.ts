import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/entity/appointment.entity';
import { Repository } from 'typeorm';
import { CreateAppoinmentDto } from './dto/createAppoinment.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';

@Injectable()
export class AppointmentService {
	constructor(
		@InjectRepository(Appointment)
		private appointmentDB: Repository<Appointment>
	) {}

	async getAllappointments(): Promise<Appointment[]> {
		return await this.appointmentDB.find({ relations: ['pet', 'clinic'] });
	}

	async getSpecificAppointment(id: number): Promise<Appointment> {
		const found = await this.appointmentDB.findOne(id, {
			relations: ['pet', 'clinic'],
		});
		if (!found) throw new NotFoundException();
		return found;
	}

	async addAppointment(
		createAppoinmentDto: CreateAppoinmentDto
	): Promise<Appointment> {
		const appointment = this.appointmentDB.create({ ...createAppoinmentDto });
		return await this.appointmentDB.save(appointment);
	}

	async updateAppointment(
		id: number,
		updateAppointmentDto: UpdateAppointmentDto
	): Promise<Appointment> {
		const found = await this.appointmentDB.findOne(id);
		if (!found) throw new NotFoundException();
		const update = Object.assign(found, updateAppointmentDto);
		return await this.appointmentDB.save(update);
	}

	async deleteAppointment(id: number) {
		const found = await this.appointmentDB.findOne(id);
		if (!found) throw new NotFoundException();
		return await this.appointmentDB.remove(found);
	}
}
