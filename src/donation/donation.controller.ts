import {
	Body,
	Controller,
	Get,
	Patch,
	Post,
	UseGuards,
	Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OK, res, KO } from 'src/constants';
import { UserService } from 'src/user/user.service';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/createDonation.dto';

@UseGuards(JwtAuthGuard)
@Controller('donation')
export class DonationController {
	constructor(
		private donationService: DonationService,
		private userService: UserService
	) {}

	@Get()
	async getAllDonations() {
		return res(await this.donationService.getAll());
	}

	@Post('/donator/search')
	async searchDonatorbyPhone(@Body() data) {
		try {
			return res(await this.donationService.searchDonatorbyPhone(data));
		} catch (e) {
			return KO;
		}
	}

	@Post('/search')
	async searchDonationbyPhone(@Body() data) {
		try {
			return res(await this.donationService.searchDonationbyPhone(data));
		} catch (e) {
			return KO;
		}
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

	@Get(':id')
	async getbyId(@Param('id') id: number) {
		try {
			return res(await this.donationService.getbyId(id));
		} catch (e) {
			return KO;
		}
	}

	@Post('donator')
	async createDonator(donator: any) {
		{
			try {
				return res(
					await this.userService.create({
						role: 'người quyên góp',
						...donator,
					})
				);
			} catch (e) {
				return OK;
			}
		}
	}
}
