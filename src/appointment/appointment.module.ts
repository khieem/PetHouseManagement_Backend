/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicModule } from 'src/clinic/clinic.module';
import { Appointment } from 'src/entity/appointment.entity';
import { PetModule } from 'src/pet/pet.module';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';

@Module({
	imports: [TypeOrmModule.forFeature([Appointment]), PetModule, ClinicModule],
	controllers: [AppointmentController],
	providers: [AppointmentService],
	exports: [AppointmentService],
})
export class AppointmentModule {}
