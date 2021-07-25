import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService
	) {}

	async validateUser(phone: string, password: string) {
		const user = await this.userService.getOne({ phone: phone });
		if (!user) throw new NotFoundException();
		if (user.password != password) throw new UnauthorizedException();
		return user;
	}
	async login(info) {
		try {
			const user = await this.validateUser(info.phone, info.password);
			const { id, password, ...rest } = user;
			return {
				status: 'OK',
				access_token: this.jwtService.sign({ id }),
				user: { id, rest },
			};
		} catch (e) {
			if (e instanceof NotFoundException)
				return { status: 'KO', errorCode: 1001 };
			else return { status: 'KO', errorCode: 1002 };
		}
	}
}
