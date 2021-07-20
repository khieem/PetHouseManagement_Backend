import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Pet } from 'src/entity/pet.entity';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
	constructor(private petService: PetService) {}

	@Get()
	getAllPet() {
		return this.petService.getAll();
	}

	@Get(':id')
	getPet(@Param('id') id: string) {
		return this.petService.getbyId(id);
	}

	@Post()
	createPet(@Body() pet: Pet) {
		return this.petService.create(pet);
	}

	@Post(':id')
	updatePet(@Param('id') id: string, @Body() petdata: Pet) {
		return this.petService.updateInf(id, petdata);
	}
}
