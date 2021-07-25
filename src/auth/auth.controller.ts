import { UseGuards } from '@nestjs/common';
import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('login')
export class AuthController {
	constructor(private authService: AuthService) {}

	// @UseGuards(LocalAuthGuard)
	@Post()
	async login(@Request() req) {
		return this.authService.login(req.body);
	}
}
