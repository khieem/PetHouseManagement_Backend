import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/createClinic.dto';
import { ReturnClinicDto } from './dto/returnClinic.dto';
import { UpdateClinicDto } from './dto/updateClinic.dto';

@UseGuards(JwtAuthGuard)
@Controller('clinic')
export class ClinicController {
	constructor(private clinicService: ClinicService) {}

	@Get()
	async getAllClinics(): Promise<ReturnClinicDto[]> {
		return await this.clinicService.getAll();
	}

	@Get(':id')
	async getClinicById(@Param('id') id: number): Promise<ReturnClinicDto> {
		return this.clinicService.get(id);
	}

	@Post()
	async createNewClinic(
		@Body() clinic: CreateClinicDto
	): Promise<ReturnClinicDto> {
		return await this.clinicService.create(clinic);
	}

	@Patch(':id')
	updateClinic(
		@Param('id') id: number,
		dto: UpdateClinicDto
	): Promise<ReturnClinicDto> {
		return this.clinicService.update(id, dto);
	}
}
