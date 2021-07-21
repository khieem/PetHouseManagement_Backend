import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ClinicController } from './clinic.controller';

@Module({
  imports:[UserModule],
  controllers: [ClinicController]
})
export class ClinicModule {}
