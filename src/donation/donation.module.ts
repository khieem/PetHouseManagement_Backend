import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from 'src/entity/donation.entity';
import { UserModule } from 'src/user/user.module';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';

@Module({
	imports: [TypeOrmModule.forFeature([Donation]), UserModule],
	controllers: [DonationController],
	providers: [DonationService],
})
export class DonationModule {}
