import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicService } from 'src/clinic/clinic.service';
import { Appointment } from 'src/entity/appointment.entity';
import { PetService } from 'src/pet/pet.service';
import { Repository } from 'typeorm';
import { CreateAppoinmentDto } from './dto/createAppoinment.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';

@Injectable()
export class AppointmentService {
	constructor(
		@InjectRepository(Appointment)
		private appointmentDB: Repository<Appointment>,
		private petService: PetService,
		private clinicService: ClinicService
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

	async addAppointment(dto: CreateAppoinmentDto): Promise<Appointment> {
		const { date, petId, clinicId } = dto;
		const apt = this.appointmentDB.create({ date });
		apt.pet = await this.petService.getbyId(petId);
		apt.clinic = await this.clinicService.get(clinicId);
		return await this.appointmentDB.save(apt);
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
