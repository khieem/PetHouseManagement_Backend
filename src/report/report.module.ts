import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from 'src/entity/report.entity';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
	imports: [TypeOrmModule.forFeature([Report])],
	controllers: [ReportController],
	providers: [ReportService],
})
export class ReportModule {}
