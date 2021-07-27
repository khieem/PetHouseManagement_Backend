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
import { Pet } from 'src/entity/pet.entity';
import { createPetDto } from './dtos/createPet.dto';
import { updatePetDto } from './dtos/updatePet.dto';
import { PetService } from './pet.service';

@UseGuards(JwtAuthGuard)
@Controller('pet')
export class PetController {
	constructor(private petService: PetService) {}

	@Get()
	async getAllPet() {
		return res(await this.petService.getAll());
	}

	@Get(':id')
	async getPet(@Param('id') id: string) {
		const found = await this.petService.getbyId(id);
		if (!found) return KO;
		else return res(found);
	}

	@Post()
	async createPet(@Body() pet: createPetDto) {
		try {
			await this.petService.create(pet);
			return OK;
		} catch (e) {
			return KO;
		}
	}

	@Patch(':id')
	async updatePet(@Param('id') id: string, @Body() petdata: updatePetDto) {
		try {
			await this.petService.updateInf(id, petdata);
			return OK;
		} catch (e) {
			return KO;
		}
	}
}
