import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Donation } from 'src/entity/donation.entity';
import { UserService } from 'src/user/user.service';
import { DonationService } from './donation.service';

@UseGuards(JwtAuthGuard)
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
		return this.userService.getUser({ role: 'donator' });
	}
}
