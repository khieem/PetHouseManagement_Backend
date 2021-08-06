import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { KO, OK, res } from 'src/constants';
import { CreateReportDto } from './dtos/createReport.dto';
import { ReportService } from './report.service';

@UseGuards(JwtAuthGuard)
@Controller('report')
export class ReportController {
	constructor(private reportService: ReportService) {}

	@Get()
	async getAllReports() {
		return res(await this.reportService.getAll());
	}

	@Get('/clinic/:id')
	async getReportbyClinic(@Param('id') id: number) {
		try {
			return await this.reportService.getReportbyClinic(id);
		} catch (e) {
			return KO;
		}
	}

	@Get(':id')
	async getReportById(@Param('id') id: number) {
		return this.reportService.getById(id);
	}

	@Post()
	async createrReport(@Body() dto: CreateReportDto) {
		try {
			return await this.reportService.create(dto);
		} catch (error) {
			return KO;
		}
	}
}
