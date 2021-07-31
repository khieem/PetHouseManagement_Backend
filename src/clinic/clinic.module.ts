import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ClinicController } from './clinic.controller';
import { ClinicService } from './clinic.service';

@Module({
	imports: [UserModule],
	controllers: [ClinicController],
	providers: [ClinicService],
	exports: [ClinicService],
})
export class ClinicModule {}
