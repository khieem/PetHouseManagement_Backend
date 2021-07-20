import { AppointmentModule } from './appointment/appointment.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { PetModule } from './pet/pet.module';

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
	],
})
export class AppModule { }
