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
import { KO, OK, res } from 'src/constants';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/createClinic.dto';
import { UpdateClinicDto } from './dto/updateClinic.dto';

@UseGuards(JwtAuthGuard)
@Controller('clinic')
export class ClinicController {
	constructor(private clinicService: ClinicService) {}

	@Get()
	async getAllClinics() {
		return res(await this.clinicService.getAll());
	}

	@Get(':id')
	async getClinicById(@Param('id') id: number) {
		try {
			return res(await this.clinicService.get(id));
		} catch (e) {
			return KO;
		}
	}

	@Post()
	async createNewClinic(@Body() clinic: CreateClinicDto) {
		try {
			return res(await this.clinicService.create(clinic));
		} catch (e) {
			return KO;
		}
	}

	@Patch(':id')
	async updateClinic(@Param('id') id: number, @Body() dto: UpdateClinicDto) {
		try {
			await this.clinicService.update(id, dto);
			return OK;
		} catch (e) {
			return KO;
		}
	}

	@Post('/search')
	async searchByPhone(@Body() data) {
		try {
			return res(await this.clinicService.searchByPhone(data));
		} catch (e) {
			return KO;
		}
	}
}
