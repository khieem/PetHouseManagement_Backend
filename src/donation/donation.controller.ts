import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/createDonation.dto';

@UseGuards(JwtAuthGuard)
@Controller('donation')
export class DonationController {
	constructor(private donationService: DonationService) {}

	@Get()
	async getAllDonations() {
		return await this.donationService.getAll();
	}

	@Post()
	async createDonation(@Body() donation: CreateDonationDto) {
		return await this.donationService.create(donation);
	}

	@Get('donator')
	async getAllDonators() {
		return this.donationService.getAllDonators();
	}
}
