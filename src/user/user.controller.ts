import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	getAllUser() {
		return this.userService.getAll();
	}

	@Get(':id')
	getUser(@Param('id') id: string) {
		return this.userService.getUser({ id });
	}

	@Post()
	createUser(@Body() user: User) {
		return this.userService.create(user);
	}
}
