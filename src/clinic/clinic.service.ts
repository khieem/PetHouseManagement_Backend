import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateClinicDto } from './dto/createClinic.dto';
import { UpdateClinicDto } from './dto/updateClinic.dto';

@Injectable()
export class ClinicService {
	constructor(private userService: UserService) {}

	async getAll() {
		return await this.userService.getAll({ role: 'Phòng khám' });
	}

	async get(i: number) {
		const found = await this.userService.getOne({ id: i, role: 'Phòng khám' });
		if (!found) throw new NotFoundException();
		return found;
	}

	async create(dto: CreateClinicDto) {
		const found = await this.userService.getOne({ phone: dto.phone });
		if (found) throw new BadRequestException('Số điện thoại đã được sử dụng');
		return await this.userService.create({
			role: 'Phòng khám',
			collab: true,
			password: dto.phone,
			...dto,
		});
	}

	async update(id: number, dto: UpdateClinicDto) {
		if (dto.phone) {
			const found = await this.userService.getOne({ phone: dto.phone });
			if (found) throw new BadRequestException();
		}
		return await this.userService.update(id, dto);
	}

	async searchByPhone(phone: string) {
		const found = await this.userService.getOne({
			phone: phone,
			role: 'Phòng khám',
		});
		if (!found) throw new NotFoundException();
		return found;
	}
}
