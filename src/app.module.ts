import { AppointmentModule } from './appointment/appointment.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { PetModule } from './pet/pet.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { DonationModule } from './donation/donation.module';
import { ClinicModule } from './clinic/clinic.module';
import { ReportModule } from './report/report.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		AppointmentModule,
		UserModule,
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'db',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
		}),
		PetModule,
		VolunteerModule,
		DonationModule,
		ClinicModule,
		ReportModule,
		ScheduleModule,
		AuthModule,
	],
})
export class AppModule { }
