import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicService } from 'src/clinic/clinic.service';
import { Report } from 'src/entity/report.entity';
import { ImageService } from 'src/image/image.service';
import { PetService } from 'src/pet/pet.service';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/createReport.dto';

@Injectable()
export class ReportService {
	constructor(
		@InjectRepository(Report) private reportDb: Repository<Report>,
		private imageService: ImageService,
		private petService: PetService,
		private clinicService: ClinicService
	) {}

	async getAll() {
		return await this.reportDb.find({ relations: ['images', 'pet', 'clinic'] });
	}

	async getById(id: number) {
		return await this.reportDb.findByIds([id], {
			relations: ['images', 'pet', 'clinic'],
		});
	}

	async create(dto: CreateReportDto) {
		let rp = this.reportDb.create();
		const { images, note, petId, clinicId } = dto;
		for (const img in images) {
			await this.imageService.create(img, rp);
		}
		rp.note = note;
		rp.pet = await this.petService.getbyId(petId);
		rp.clinic = await this.clinicService.get(clinicId);
		return await this.reportDb.save(rp);
	}
}
