import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateClinicDto } from './dto/createClinic.dto';
import { map2clinic, ReturnClinicDto } from './dto/returnClinic.dto';
import { UpdateClinicDto } from './dto/updateClinic.dto';

@Injectable()
export class ClinicService {
	constructor(private userService: UserService) {}

	async getAll(): Promise<ReturnClinicDto[]> {
		const users = await this.userService.getAll({ role: 'clinic' });
		return users.map((user) => map2clinic(user));
	}

	async get(i: number): Promise<ReturnClinicDto> {
		const [found] = await this.userService.getAll({ id: i, role: 'clinic' });
		if (!found) throw new NotFoundException();
		return map2clinic(found);
	}

	async create(dto: CreateClinicDto): Promise<ReturnClinicDto> {
		const found = await this.userService.getOne({ phone: dto.phone });
		if (found) throw new BadRequestException('Số điện thoại đã được sử dụng');
		return map2clinic(
			await this.userService.create({ role: 'clinic', collab: true, ...dto })
		);
	}

	async update(id: number, dto: UpdateClinicDto): Promise<ReturnClinicDto> {
		return map2clinic(await this.userService.update(id, dto));
	}
}
