import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Report } from 'src/entity/report.entity';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
	constructor(private reportService: ReportService) {}

	@Get()
	async getAllReports() {
		return await this.reportService.getAll();
	}

	@Get(':id')
	async getReportById(@Param('id') id: string) {
		return this.reportService.getById(id);
	}

	@Post()
	async createrReport(@Body() report: Report) {
		return await this.reportService.create(report);
	}
}
