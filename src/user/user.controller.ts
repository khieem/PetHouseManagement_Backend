import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/entity/user.entity';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
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
	createUser(@Body() user: UserDto) {
		return this.userService.create(user);
	}

	@Patch(':id')
	updateUser(@Param('id') id: number, @Body() userData: UserDto) {
		return this.userService.update(id, userData);
	}

	@Delete(':id')
	deleteUser(@Param('id') id:number) {
		return this.userService.removeUser(id);
	}
}
