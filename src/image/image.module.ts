import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entity/image.entity';
import { ImageService } from './image.service';

@Module({
	imports: [TypeOrmModule.forFeature([Image])],
	providers: [ImageService],
	exports: [ImageService],
})
export class ImageModule {}
