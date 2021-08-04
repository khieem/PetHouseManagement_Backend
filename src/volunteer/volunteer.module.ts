import { Module } from '@nestjs/common';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { UserModule } from 'src/user/user.module';
import { VolunteerController } from './volunteer.controller';
import { VolunteerService } from './volunteer.service';

@Module({
	imports: [UserModule, ScheduleModule],
	controllers: [VolunteerController],
	providers: [VolunteerService],
	exports: [VolunteerService],
})
export class VolunteerModule {}
