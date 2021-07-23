import { UseGuards } from '@nestjs/common';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	async register(@Body() user: User) {
		return this.authService.create(user);
	}

	// @UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.body);
	}

	@UseGuards(JwtAuthGuard)
	@Get('protected')
	get() {
		return 'hello';
	}
}
