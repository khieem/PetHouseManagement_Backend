import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OK, res } from 'src/constants';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/createDonation.dto';

@UseGuards(JwtAuthGuard)
@Controller('donation')
export class DonationController {
	constructor(private donationService: DonationService) {}

	@Get()
	async getAllDonations() {
		return res(await this.donationService.getAll());
	}

	@Post()
	async createDonation(@Body() donation: CreateDonationDto) {
		await this.donationService.create(donation);
		return OK;
	}

	@Get('donator')
	async getAllDonators() {
		return res(await this.donationService.getAllDonators());
	}
}
