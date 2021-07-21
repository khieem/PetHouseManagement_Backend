import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { PetModule } from './pet/pet.module';
import { VolunteerModule } from './volunteer/volunteer.module';

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
	],
})
export class AppModule {}
