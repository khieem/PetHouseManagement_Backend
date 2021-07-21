import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from 'src/entity/donation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DonationService {
	constructor(
		@InjectRepository(Donation) private donationDb: Repository<Donation>
	) {}

	async getAll() {
		return await this.donationDb.find();
	}

	async create(donation: Donation) {
		return await this.donationDb.save(donation);
	}
}
