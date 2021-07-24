import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
		return await this.petService.getAll();
	}

	@Get(':id')
	async getPet(@Param('id') id: string) {
		return await this.petService.getbyId(id);
	}

	@Post()
	async createPet(@Body() pet: createPetDto) {
		return await this.petService.create(pet);
	}

	@Post(':id')
	async updatePet(@Param('id') id: string, @Body() petdata: updatePetDto) {
		return await this.petService.updateInf(id, petdata);
	}
}
