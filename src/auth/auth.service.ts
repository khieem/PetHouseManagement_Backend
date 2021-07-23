import { Injectable } from '@nestjs/common';
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
		if (user && user.password === password) {
			return user;
		}
		return null;
	}
	async login(user: any) {
		const payload = { phone: user.phone };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
