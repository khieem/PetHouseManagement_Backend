import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from 'src/entity/pet.entity';

@Injectable()
export class PetService {
	constructor(@InjectRepository(Pet) private petDb: Repository<Pet>) {}

	async getAll() {
		return await this.petDb.find();
	}

	async getbyId(id) {
		return await this.petDb.findOne(id);
	}

	async create(pet: Pet) {
		return await this.petDb.save(pet);
	}

	async updateInf(id: string, petData: Pet) {
		let toUpdate = await this.petDb.findOne(id);
		if (toUpdate !== null) {
			let update = Object.assign(toUpdate, petData);
			this.petDb.delete(toUpdate);
			return this.petDb.save(update);
		}
	}
}
