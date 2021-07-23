import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from 'src/entity/donation.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateDonationDto } from './dto/createDonation.dto';
import { map2donator, ReturnDonatorDto } from './dto/returnDonator.dto';

@Injectable()
export class DonationService {
	constructor(
		@InjectRepository(Donation) private donationDb: Repository<Donation>,
		private userService: UserService
	) {}

	async getAll() {
		return await this.donationDb.find();
	}

	async create(dto: CreateDonationDto) {
		const donation = this.donationDb.create({ ...dto });
		return await this.donationDb.save(donation);
	}

	async getAllDonators(): Promise<ReturnDonatorDto[]> {
		const users = await this.userService.getUser({ role: 'donator' });
		return users.map((user) => map2donator(user));
	}
}
