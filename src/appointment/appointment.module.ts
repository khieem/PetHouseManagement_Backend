/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/entity/appointment.entity';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';

@Module({
    imports: [TypeOrmModule.forFeature([Appointment])],
    controllers: [AppointmentController],
    providers: [AppointmentService],
})
export class AppointmentModule { }
