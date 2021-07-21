import { Body, Controller, Get, Post } from '@nestjs/common';
import { Donation } from 'src/entity/donation.entity';
import { UserService } from 'src/user/user.service';
import { DonationService } from './donation.service';

@Controller('donation')
export class DonationController {
	constructor(
		private donationService: DonationService,
		private userService: UserService
	) {}

	@Get()
	async getAllDonations() {
		return await this.donationService.getAll();
	}

	@Post()
	async createDonation(@Body() donation: Donation) {
		return await this.donationService.create(donation);
	}

	@Get('donator')
	async getAllDonator() {
		return this.userService.getUsersByRole('donator');
	}
}
