import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from 'src/entity/pet.entity';
import { createPetDto } from './dtos/createPet.dto';
import { updatePetDto } from './dtos/updatePet.dto';

@Injectable()
export class PetService {
	constructor(@InjectRepository(Pet) private petDb: Repository<Pet>) {}

	async getAll() {
		return await this.petDb.find();
	}

	async getbyId(id) {
		return await this.petDb.findOne(id);
	}

	async create(dto: createPetDto) {
		const pet = this.petDb.create({ ...dto });
		return await this.petDb.save(pet);
	}

	async updateInf(id: string, dto: updatePetDto) {
		let toUpdate = await this.petDb.findOne(id);
		if (!toUpdate) throw new BadRequestException('Không tồn tại thú cưng này');
		let update = Object.assign(toUpdate, dto);
		return this.petDb.save(update);
	}
}
