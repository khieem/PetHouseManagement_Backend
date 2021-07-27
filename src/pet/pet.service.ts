import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from 'src/entity/pet.entity';
import { createPetDto } from './dtos/createPet.dto';
import { updatePetDto } from './dtos/updatePet.dto';

@Injectable()
export class PetService {
	constructor(@InjectRepository(Pet) private petDb: Repository<Pet>) {}

	async getAll() {
		return await this.petDb.find({
			relations: ['reports', 'appointments', 'volunteer'],
		});
	}

	async getbyId(id) {
		return await this.petDb.findOne(id, {
			relations: ['reports', 'appointments', 'volunteer'],
		});
	}

	async create(dto: createPetDto) {
		const found = await this.petDb.findOne({ name: dto.name });
		if (found) throw new BadRequestException();
		const pet = this.petDb.create({ ...dto });
		return await this.petDb.save(pet);
	}

	async updateInf(id: string, dto: updatePetDto) {
		let toUpdate = await this.petDb.findOne(id);
		if (!toUpdate) throw new NotFoundException('Không tồn tại thú cưng này');

		const found = await this.petDb.findOne({ name: dto.name });
		if (found) throw new BadRequestException();
		let update = Object.assign(toUpdate, dto);
		return this.petDb.save(update);
	}
}
