import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OK, res } from 'src/constants';
import { Donation } from 'src/entity/donation.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateDonationDto } from './dto/createDonation.dto';

@Injectable()
export class DonationService {
	constructor(
		@InjectRepository(Donation) private donationDb: Repository<Donation>,
		private userService: UserService
	) {}

	async getAll() {
		return await this.donationDb.find({ relations: ['donator'] });
	}

	async getbyId(id) {
		return await this.donationDb.findOne(id, { relations: ['donator'] });
	}

	async searchDonatorbyPhone(data) {
		const found = await this.userService.getOne({
			phone: data.search,
			role: 'Người quyên góp',
		});
		if (!found) throw new NotFoundException();
		return found;
	}
	async searchDonationbyPhone(data) {
		const found = this.searchDonatorbyPhone(data);
		const donations = (await found).donations;
		if (donations.length == 0 || !found) throw new NotFoundException();
		return donations;
	}

	async create(dto: CreateDonationDto) {
		const donation = this.donationDb.create();
		const { amount, donator, address } = dto;
		donation.amount = amount;
		donation.address = address;
		const found = await this.userService.getOne({ phone: donator.phone });
		if (!found) {
			donation.donator = await this.userService.create({
				role: 'Người quyên góp',
				collab: true,
				...donator,
			});
		} else {
			donation.donator = found;
		}
		await this.donationDb.save(donation);
		return OK;
	}

	async getAllDonators() {
		return await this.userService.getAll({ role: 'Người quyên góp' });
	}
}
