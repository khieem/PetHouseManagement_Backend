import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolunteerController } from './volunteer.controller';
import { Volunteer } from './volunteer.entity';
import { VolunteerService } from './volunteer.service';

@Module({
	imports: [TypeOrmModule.forFeature([Volunteer])],
	controllers: [VolunteerController],
	providers: [VolunteerService],
})
export class VolunteerModule {}
