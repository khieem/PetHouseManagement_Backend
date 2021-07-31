import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/entity/schedule.entity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
	imports: [TypeOrmModule.forFeature([Schedule])],
	controllers: [ScheduleController],
	providers: [ScheduleService],
	exports: [ScheduleService],
})
export class ScheduleModule {}
