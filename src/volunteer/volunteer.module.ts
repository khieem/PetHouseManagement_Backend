import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { VolunteerController } from './volunteer.controller';

@Module({
	imports: [UserModule],
	controllers: [VolunteerController],
})
export class VolunteerModule {}
