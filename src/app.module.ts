import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolunteerModule } from 'src/volunteer/volunteer.module';

@Module({
	imports: [
		VolunteerModule,
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'db',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
		}),
	],
})
export class AppModule {}
