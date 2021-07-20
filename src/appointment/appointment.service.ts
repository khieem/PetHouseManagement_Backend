/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/entity/appointment.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService { 
    constructor(@InjectRepository(Appointment) private appointmentDB: Repository<Appointment>) {}

    async getAllappointments(): Promise<Appointment[]> {
        return await this.appointmentDB.find();
    }

    async getSpecificAppointment(id: number): Promise<Appointment> {
        return await this.appointmentDB.findOneOrFail(id);
    }

    async addAppointment(appointment: Appointment): Promise<Appointment> {
        return await this.appointmentDB.save(appointment);
    }

    async updateAppointment(id: number, date: Date, clinic: User): Promise<Appointment> {
        const appUpdate = await this.getSpecificAppointment(id);
        appUpdate.date = date;
        appUpdate.clinic = clinic;
        return this.appointmentDB.save(appUpdate);
    }   

}
