import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { PetModule } from './pet/pet.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { DonationModule } from './donation/donation.module';
import { ClinicModule } from './clinic/clinic.module';

@Module({
	imports: [
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
	],
})
export class AppModule {}
