import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService
	) {}

	async create(user: any) {
		return this.userService.create(user);
	}

	async finOne(condition: any) {
		return this.userService.getUser(condition);
	}

	async validateUser(phone: string, password: string) {
		const [user] = await this.userService.getUser({ phone: phone });
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
