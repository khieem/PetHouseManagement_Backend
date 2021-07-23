import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from 'src/entity/report.entity';
import { Repository } from 'typeorm';
import { createReportDto } from './dtos/createReport.dto';

@Injectable()
export class ReportService {
	constructor(@InjectRepository(Report) private reportDb: Repository<Report>) {}

	async getAll() {
		return await this.reportDb.find();
	}

	async getById(id: string) {
		return await this.reportDb.findByIds([id]);
	}

	async create(dto: createReportDto) {
		return await this.reportDb.save({ ...dto });
	}
}
