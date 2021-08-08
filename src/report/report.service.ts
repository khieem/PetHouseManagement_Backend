import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicService } from 'src/clinic/clinic.service';
import { OK, res } from 'src/constants';
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

	async getReportbyClinic(id: number) {
		const found = await this.clinicService.get(id);
		if (!found) throw new NotFoundException();
		return res(found.reports);
	}

	async create(dto: CreateReportDto) {
		let rp = this.reportDb.create();
		const {
			images,
			note,
			petId,
			clinicId,
			weight,
			overall,
			allergies,
			vaccines,
			surgeries,
			diagnosis,
			prescription,
		} = dto;
		for (const img in images) {
			await this.imageService.create(img, rp);
		}
		rp.note = note;
		rp.weight = weight;
		rp.overall = overall;
		rp.allergies = allergies;
		rp.vaccines = vaccines;
		rp.surgeries = surgeries;
		rp.diagnosis = diagnosis;
		rp.prescription = prescription;
		rp.pet = await this.petService.getbyId(petId);
		rp.clinic = await this.clinicService.get(clinicId);
		await this.reportDb.save(rp);
		return OK;
	}
}
