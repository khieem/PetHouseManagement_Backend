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
import { KO, OK, res } from 'src/constants';
import { ScheduleService } from 'src/schedule/schedule.service';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
	constructor(private userService: UserService,
				) {}

	@Get()
	async getAllUser() {
		return res(await this.userService.getAll({collab: "true"}));
	}


	@Get('/user_schedule')
	async getUserBySchedule() {
		return res(await this.userService.getAll({collab: "true"}, false));
	}
	
		@Get('/user_schedule/:id')
		async getSpecificUserSchedule(@Param('id') id: number) {
			const found = await this.userService.getOne({id});
			if (!found) return KO;
			else {
				if (found.collab == false) return KO;
				else return res(found);
			}
		}

	@Get(':id')
	async getUser(@Param('id') id: number) {
		const found = await this.userService.getOne({ id });
		if (!found) return KO;
		else return res(found);
	}

	@Post()
	async createUser(@Body() user: any) {
		try {
			await this.userService.create(user);
			return OK;
		} catch (e) {
			return KO;
		}
	}

	@Patch(':id')
	async updateUser(@Param('id') id: number, @Body() body: any) {
		try {
			await this.userService.update(id, body);
			return OK;
		} catch (e) {
			return KO;
		}
	}

	@Delete(':id')
	async deleteUser(@Param('id') id: number) {
		return await this.userService.removeUser(id);
	}
}
