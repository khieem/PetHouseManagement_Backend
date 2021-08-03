import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entity/image.entity';
import { Report } from 'src/entity/report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
	constructor(@InjectRepository(Image) private imageDb: Repository<Image>) {}

	async create(url: string, report: Report) {
		let img = this.imageDb.create({ url });
		img.report = report;
		await this.imageDb.save(img);
	}
}
