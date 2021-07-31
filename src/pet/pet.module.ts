import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'src/entity/pet.entity';
import { VolunteerModule } from 'src/volunteer/volunteer.module';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';

@Module({
	imports: [TypeOrmModule.forFeature([Pet]), VolunteerModule],
	controllers: [PetController],
	providers: [PetService],
	exports: [PetService],
})
export class PetModule {}
