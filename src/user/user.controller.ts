import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/entity/user.entity';
// import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	async getAllUser() {
		return await this.userService.getAll();
	}

	@Get(':id')
	async getUser(@Param('id') id: string) {
		return await this.userService.getOne({ id });
	}

	@Post()
	async createUser(@Body() user) {
		return await this.userService.create(user);
	}

	@Patch(':id')
	async updateUser(@Param('id') id: number, @Body() userData) {
		return await this.userService.update(id, userData);
	}

	@Delete(':id')
	async deleteUser(@Param('id') id: number) {
		return await this.userService.removeUser(id);
	}
}
