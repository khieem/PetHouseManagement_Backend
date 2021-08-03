import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicModule } from 'src/clinic/clinic.module';
import { Report } from 'src/entity/report.entity';
import { ImageModule } from 'src/image/image.module';
import { PetModule } from 'src/pet/pet.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
	imports: [
		ImageModule,
		PetModule,
		ClinicModule,
		TypeOrmModule.forFeature([Report]),
	],
	controllers: [ReportController],
	providers: [ReportService],
	exports: [ReportService],
})
export class ReportModule {}
