import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Pet } from 'src/entity/pet.entity';
import { PetService } from './pet.service';

@UseGuards(JwtAuthGuard)
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
