import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { res } from 'src/constants';
import { createReportDto } from './dtos/createReport.dto';
import { ReportService } from './report.service';

@UseGuards(JwtAuthGuard)
@Controller('report')
export class ReportController {
	constructor(private reportService: ReportService) {}

	@Get()
	async getAllReports() {
		return res(await this.reportService.getAll());
	}

	@Get(':id')
	async getReportById(@Param('id') id: string) {
		return this.reportService.getById(id);
	}

	@Post()
	async createrReport(@Body() dto: createReportDto) {
		return await this.reportService.create(dto);
	}
}
